<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet; [key: string]: unknown } = $props();
</script>

<span class="bg-[#ffff00]/[0.4]">{@render children?.()}</span>
