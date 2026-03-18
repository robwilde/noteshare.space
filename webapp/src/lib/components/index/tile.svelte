<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, text }: { title?: Snippet; text?: Snippet } = $props();
</script>

<div class="md:w-1/2 md:p-4">
	<div class="text-2xl font-bold mb-4 text-center">
		{@render title?.()}
	</div>
	<div class="md:prose-lg text-center text-zinc-700 dark:text-zinc-300">
		{@render text?.()}
	</div>
</div>
