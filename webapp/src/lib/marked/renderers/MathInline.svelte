<script lang="ts">
	import Katex from '$lib/components/Math.svelte';

	let { text }: { text: string } = $props();
</script>

<Katex math={text} />
