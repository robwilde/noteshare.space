<script lang="ts">
	import type { Snippet } from 'svelte';
	import Callout from '../../components/Callout.svelte';

	let { raw, children }: { raw: string; children?: Snippet } = $props();

	let isCallout = $derived(raw.split('\n')[0].match(/>\s?\[!(.+)]([+-]?)(\s.*|$)/) != null);
</script>

{#if isCallout}
	<Callout>
		{@render children?.()}
	</Callout>
{:else}
	<p
		class="border border-l-4 ml-4 prose-p:my-2 prose-p:mx-4 dark:border-zinc-600 transition-colors"
	>
		{@render children?.()}
	</p>
{/if}
