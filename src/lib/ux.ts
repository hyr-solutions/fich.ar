export function resizeToInputContent(input: HTMLInputElement) {
	const context = document.createElement('canvas').getContext('2d')
	if (!context) return
	const style = getComputedStyle(input)
	context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
	const textWidth = context.measureText(input.value || input.placeholder).width
	input.style.width = `${textWidth + 24}px`
}

export function formatRelativeTime(date: Date | string): string {
	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
	const now = new Date()
	const targetDate = new Date(date)

	// Difference in seconds
	const diffInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000)

	const units = [
		{ max: 60, value: diffInSeconds, unit: 'second' },
		{ max: 3600, value: diffInSeconds / 60, unit: 'minute' },
		{ max: 86400, value: diffInSeconds / 3600, unit: 'hour' },
		{ max: 604800, value: diffInSeconds / 86400, unit: 'day' },
		{ max: 2592000, value: diffInSeconds / 604800, unit: 'week' },
		{ max: 31536000, value: diffInSeconds / 2592000, unit: 'month' },
		{ max: Infinity, value: diffInSeconds / 31536000, unit: 'year' }
	]

	for (const unit of units) {
		if (Math.abs(diffInSeconds) < unit.max) {
			return rtf.format(Math.round(unit.value), unit.unit as Intl.RelativeTimeFormatUnit)
		}
	}

	return '' // Fallback, though technically unreachable
}

export function formatUrlInput(input: string): string {
	const protocol = 'https://'

	if (input === '' || input === protocol) {
		return ''
	}

	if (!input.startsWith(protocol)) {
		input = protocol + input
	}

	const urlParts = input.slice(protocol.length).split(/(?=[/?#])/)
	const domain = urlParts[0]
	const remainder = urlParts.slice(1).join('')

	const validDomainRegex = /^[a-zA-Z0-9-.]*$/
	const sanitizedDomain = domain
		.split('')
		.filter((char) => validDomainRegex.test(char))
		.join('')
		.toLowerCase()

	const validRemainderRegex = /^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*$/
	const sanitizedRemainder = remainder
		.split('')
		.filter((char) => validRemainderRegex.test(char))
		.join('')

	return protocol + sanitizedDomain + sanitizedRemainder
}

export async function withStatus<T, E = any>(
	element: HTMLElement,
	callback: () => Promise<T>
): Promise<{ ok: true; value: T } | { ok: false; error: E }> {
	element.classList.remove('sent')
	element.classList.remove('error')
	element.classList.add('wait')

	try {
		let value = await callback()
		element.classList.remove('wait')
		element.classList.add('sent')
		return { ok: true, value }
	} catch (error) {
		element.classList.remove('wait')
		element.classList.add('error')
		return { ok: false, error: error as E }
	}
}
