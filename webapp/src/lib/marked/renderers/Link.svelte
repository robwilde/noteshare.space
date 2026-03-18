<script lang="ts">
	import type { Snippet } from 'svelte';
	import LinkIcon from 'svelte-icons/md/MdOpenInNew.svelte';
	import InternalLink from './InternalLink.svelte';

	let { href = '', title, children }: { href?: string; title: string; children?: Snippet } =
		$props();

	let isWebLink = $derived(!href || !!href.match(/^https?:\/\//));
</script>

{#if isWebLink}
	<span class="underline cursor-not-allowed inline-flex items-center font-normal">
		<a {href} {title} class="external-link text-[#705dcf]">{@render children?.()}</a>
		<span class="h-3 w-3 inline-block mb-2 text-zinc-400 ml-0.5"><LinkIcon /></span>
	</span>
{:else}
	<InternalLink useSlot>{@render children?.()}</InternalLink>
{/if}
