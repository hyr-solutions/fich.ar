<script lang="ts">
	import { onMount } from 'svelte'

	const { attributeName = 'data-cursor-hover', className = '', padding = 16, border = 2 } = $props()
	let cursor: HTMLDivElement
	const leaveClasses = `!border-transparent`

	function setCursorTransformWithElement(target: HTMLElement, customPadding = padding) {
		const top = target.offsetTop
		const left = target.offsetLeft
		const width = target.clientWidth
		const height = target.clientHeight

		cursor.style.top = `${top - customPadding}px`
		cursor.style.left = `${left - customPadding}px`
		cursor.style.width = `${width + customPadding * 2 + border * 2}px`
		cursor.style.height = `${height + customPadding * 2 + border * 2}px`
	}

	onMount(() => {
		const cursorAttribute = attributeName
		const cursorSelector = `[${attributeName}]`
		let elements = document.querySelectorAll<HTMLElement>(cursorSelector)

		for (const el of elements) {
			el.addEventListener('pointerover', handlePointerOver(el.getAttribute(cursorAttribute)))
			el.addEventListener('pointerleave', handlePointerLeave(el.getAttribute(cursorAttribute)))
		}
		const baseClasses = `${cursor.className} ${className}`
		cursor.className = 'hidden'
		setCursorTransformWithElement(elements[0])

		function handlePointerOver(classes?: string | null | undefined) {
			return (e: Event) => {
				if (!(e instanceof PointerEvent)) return
				const t = e.currentTarget
				if (!(t instanceof HTMLElement)) return

				cursor.className = baseClasses
				if (classes) cursor.className += ' ' + classes
				const customPadding = t.getAttribute('data-cursor-padding')

				setCursorTransformWithElement(t, customPadding ? parseInt(customPadding) : undefined)
			}
		}
		function handlePointerLeave(classes?: string | null | undefined) {
			return (e: Event) => {
				if (!(e instanceof PointerEvent)) return
				const t = e.currentTarget
				if (!(t instanceof HTMLElement)) return

				cursor.classList.add(...leaveClasses.split(' '))
			}
		}
		return () => {
			for (const el of elements) {
				el.removeEventListener('pointerover', handlePointerOver(el.getAttribute(cursorAttribute)))
				el.removeEventListener('pointerleave', handlePointerLeave(el.getAttribute(cursorAttribute)))
			}
		}
	})
</script>

<div
	bind:this={cursor}
	inert
	class="absolute left-0 top-0 z-50 rounded border-2 border-white transition-all {className}">
</div>
