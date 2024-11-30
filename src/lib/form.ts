import { PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY } from '$env/static/public'
import { z } from 'zod'

export type ParsedField = {
	type: string
	placeholder: string
	name: string
	options: Record<string, any> | null
	value: string | null
	values?: { value: string; placeholder: string }[]
}

export function parseSchemaString(input: string): ParsedField[] {
	const fields: ParsedField[] = []

	const rows = input.split(/\s*,\s*/) // Split rows by commas with surrounding whitespace

	for (const row of rows) {
		// Match quoted strings as single tokens or unquoted words separately
		const tokens = row.match(/"[^"]+"|'[^']+'|\S+/g)
		if (!tokens || tokens.length < 2) continue // Ensure at least `type` and `name|placeholder`

		// Extract `type`
		const type = tokens[0].trim()

		// Extract `name|placeholder`, removing any surrounding quotes
		const namePlaceholder = tokens[1].replace(/^['"]|['"]$/g, '').trim()

		// Extract optional `value`
		const value =
			tokens[2] && !tokens[2].includes('=') ? tokens[2].replace(/^['"]|['"]$/g, '').trim() : null

		// Extract options if any
		const options: Record<string, any> = {}
		const optionTokens = tokens.slice(value ? 3 : 2) // Start after `value` or directly after `name|placeholder`

		// Join options into a single string, then split by semicolon, preserving quoted values
		const optionString = optionTokens.join(' ')
		const optionPairs = optionString.match(/(\w+)=('[^']*'|"[^"]*"|[^;\s]+)/g) || []

		for (const pair of optionPairs) {
			const [key, rawVal] = pair.split('=').map((str) => str.trim())

			if (key && rawVal !== undefined) {
				// Remove surrounding quotes, if any
				let parsedVal: any = rawVal.replace(/^['"]|['"]$/g, '')

				// Parse the value intelligently
				if (parsedVal === 'true') parsedVal = true
				else if (parsedVal === 'false') parsedVal = false
				else if (!isNaN(Number(parsedVal))) parsedVal = Number(parsedVal)

				options[key] = parsedVal
			}
		}

		// Determine placeholder and name, with options taking precedence
		const placeholder = options.placeholder ? String(options.placeholder) : namePlaceholder
		const name = options.name ? String(options.name) : placeholder

		fields.push({
			type,
			placeholder,
			name,
			options: Object.keys(options).length ? options : null,
			value
		})
	}

	let captchaSolution = getCaptcha(fields)
	if (!captchaSolution) {
		let buttonIndex = fields.findIndex((field) => field.type === 'button')
		let captchaField = {
			type: 'captcha',
			placeholder: 'turnstile',
			name: 'turnstile',
			options: {},
			value: PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
		}
		if (buttonIndex === -1) {
			fields.push(captchaField)
		} else {
			fields.splice(buttonIndex, 0, captchaField)
		}
	}

	let groupedFields = groupFields(fields)
	return groupedFields
}

export function groupFields(fields: ParsedField[]) {
	let groupedFields: ParsedField[] = []
	for (let field of fields) {
		if (field.type === 'select') {
			let existingField = groupedFields.find((i) => i.type === field.type && i.name === field.name)
			if (existingField) {
				existingField.values?.push({
					value: field?.options?.name ?? field.value ?? '',
					placeholder: field.value ?? ''
				})
			} else {
				groupedFields.push({
					...field,
					values: [
						{
							value: field?.options?.name ?? field.value ?? '',
							placeholder: field.value ?? ''
						}
					]
				})
			}
		} else groupedFields.push(field)
	}
	return groupedFields
}

export function getCaptcha(fields: ParsedField[]) {
	return fields.findLast((field) => ['captcha'].includes(field.type))
}

export function generateDynamicSchema(fields: ParsedField[]) {
	const fieldSchemas: Record<string, z.ZodTypeAny> = {}

	fields.forEach((field) => {
		const { name, type, options, values } = field

		let schema: z.ZodTypeAny

		switch (type) {
			case 'email':
				schema = z.string().email('Invalid email address').optional()
				break

			case 'number':
				schema = z
					.string()
					.refine((val) => !isNaN(Number(val)), 'Must be a number')
					.optional()
				break

			case 'checkbox':
				schema = z.enum(['on']).optional() // Checkbox is often "on" when checked, undefined when not.
				break

			case 'file':
				schema = z.instanceof(File).optional() // Expect a single File object.
				break

			case 'select':
				if (!values || values.length === 0) {
					throw new Error(`"values" is required for select field: ${name}`)
				}
				schema = z.string().refine((val) => values.some((v) => v.value === val), 'Invalid option')
				break

			default:
				schema = z.string().optional() // Default to optional string.
		}

		// Apply constraints from `options` dynamically.
		if (options) {
			if (options.required) {
				schema = schema.refine((val) => val !== undefined && val !== null && val !== '', {
					message: 'This field is required'
				})
			}
			if (options.maxlength) {
				schema = schema.refine((val) => val.length <= options.maxlength, {
					message: `Must be at most ${options.maxlength} characters`
				})
			}
		}

		// Add the schema to the object keyed by the field's `name`.
		fieldSchemas[name] = schema
	})

	// Return the Zod schema for the object.
	return z.object(fieldSchemas)
}

export function containsSubmissionData(field: ParsedField) {
	return !['captcha', 'button'].includes(field.type)
}
