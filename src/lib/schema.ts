import { PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY } from '$env/static/public'
import deepEqual from 'deep-equal'
import { z } from 'zod'

export type ParsedField = {
	type: string
	placeholder: string
	name: string
	options: Record<string, any> | null
	value: string | null
	values?: { value: string; placeholder: string }[]
}

export abstract class Schema {
	static parse(string: string): ParsedField[] {
		const fields: ParsedField[] = []

		const rows = string.split(/\s*,\s*/)

		for (const row of rows) {
			const tokens = row.match(/"[^"]+"|'[^']+'|\S+/g)
			if (!tokens || tokens.length < 2) continue

			const type = tokens[0].trim()

			const namePlaceholder = tokens[1].replace(/^['"]|['"]$/g, '').trim()

			const value =
				tokens[2] && !tokens[2].includes('=') ? tokens[2].replace(/^['"]|['"]$/g, '').trim() : null

			const options: Record<string, any> = {}
			const optionTokens = tokens.slice(value ? 3 : 2)

			const optionString = optionTokens.join(' ')
			const optionPairs = optionString.match(/(\w+)=('[^']*'|"[^"]*"|[^;\s]+)/g) || []

			for (const pair of optionPairs) {
				const [key, rawVal] = pair.split('=').map((str) => str.trim())

				if (key && rawVal !== undefined) {
					let parsedVal: any = rawVal.replace(/^['"]|['"]$/g, '')

					if (parsedVal === 'true') parsedVal = true
					else if (parsedVal === 'false') parsedVal = false
					else if (!isNaN(Number(parsedVal))) parsedVal = Number(parsedVal)

					options[key] = parsedVal
				}
			}

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

		let captchaSolution = Schema.getCaptcha(fields)
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

		let groupedFields = Schema.groupFields(fields)
		return groupedFields
	}

	private static groupFields(fields: ParsedField[]) {
		let groupedFields: ParsedField[] = []
		for (let field of fields) {
			if (field.type === 'select') {
				let existingField = groupedFields.find(
					(i) => i.type === field.type && i.name === field.name
				)
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

	static getCaptcha(fields: ParsedField[]) {
		return fields.findLast((field) => ['captcha'].includes(field.type))
	}

	static generateValidator(fields: ParsedField[]) {
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
					schema = z.enum(['on']).optional()
					break

				case 'file':
					schema = z.instanceof(File).optional()
					break

				case 'select':
					if (!values || values.length === 0) {
						throw new Error(`"values" is required for select field: ${name}`)
					}
					schema = z.string().refine((val) => values.some((v) => v.value === val), 'Invalid option')
					break

				default:
					schema = z.string().optional()
			}

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

			fieldSchemas[name] = schema
		})

		return z.object(fieldSchemas)
	}

	static compare(firstFields: ParsedField[], secondField: ParsedField[]) {
		return deepEqual(firstFields, secondField)
	}

	static isSubmissionData(field: ParsedField) {
		return !['captcha', 'button'].includes(field.type)
	}
}
