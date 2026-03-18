<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<span class="underline text-zinc-500 dark:text-zinc-400 cursor-pointer">
	{@render children?.()}
</span>
