<script lang="ts">
	import type { Snippet } from 'svelte';

	let { depth, raw, children }: { depth: number; raw: string; children?: Snippet } = $props();

	let id: string | undefined = undefined;
</script>

{#if depth === 1}
	<h1 {id}>{@render children?.()}</h1>
{:else if depth === 2}
	<h2 {id}>{@render children?.()}</h2>
{:else if depth === 3}
	<h3 {id}>{@render children?.()}</h3>
{:else if depth === 4}
	<h4 {id}>{@render children?.()}</h4>
{:else if depth === 5}
	<h5 {id} class="font-semibold">{@render children?.()}</h5>
{:else if depth === 6}
	<h6 {id} class="font-semibold">{@render children?.()}</h6>
{:else}
	{raw}
{/if}
