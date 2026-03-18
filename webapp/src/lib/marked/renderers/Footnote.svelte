<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scrollToId } from '$lib/util/scrollToId';

	let { id, children }: { id: string; children?: Snippet } = $props();

	let content = $state<HTMLElement>();
	let returnRef = $state<HTMLElement>();

	let refMoved = $state(false);

	$effect(() => {
		if (content && returnRef) {
			const p = content.querySelector('p');
			if (p) {
				p.appendChild(returnRef);
				refMoved = true;
			}
		}
	});
</script>

<div data-footnote class="flex gap-2 prose-p:my-0">
	<p>{id}.</p>
	<span bind:this={content} class="">
		{@render children?.()}
	</span>
</div>

<span bind:this={returnRef} class="ml-1 {refMoved ? 'inline' : 'hidden'}"
	><a
		onclick={(e) => { e.preventDefault(); scrollToId(`footnote-ref-${id}`); }}
		id="footnote-{id}"
		href="#footnote-ref-{id}"
		class="no-underline">⮥</a
	></span
>
