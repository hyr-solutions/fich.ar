<script lang="ts">
	const props = $props()
	let iframeElement: HTMLIFrameElement
</script>

<iframe
	onload={(e) => {
		console.log('loadedIframe!', e)
	}}
	bind:this={iframeElement}
	{...props} />
