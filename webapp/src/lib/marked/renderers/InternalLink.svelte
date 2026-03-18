<script lang="ts">
	import type { Snippet } from 'svelte';
	import FaRegQuestionCircle from 'svelte-icons/fa/FaRegQuestionCircle.svelte';

	let {
		text = '',
		displayText: propDisplayText = '',
		useSlot = false,
		children
	}: { text?: string; displayText?: string; useSlot?: boolean; children?: Snippet } = $props();

	let displayText = $derived.by(() => {
		if (propDisplayText) return propDisplayText;
		const aliasMatch = text.match(/^.+\|(.*)$/);
		if (aliasMatch) return aliasMatch[1];
		const headerMatch = text.match(/^(.[^|]+)(.[^|]*)$/);
		if (headerMatch) return `${headerMatch[1]} > ${headerMatch[2]}`;
		return text;
	});
</script>

<dfn class="not-italic" title="Internal link">
	<span class="underline cursor-not-allowed inline-flex items-center">
		<span class="internal-link text-[#705dcf] opacity-50">
			{#if useSlot}
				{@render children?.()}
			{:else}
				{displayText}
			{/if}
		</span>
		<span class="w-3 h-3 inline-block mb-2 text-zinc-400 ml-0.5"><FaRegQuestionCircle /></span>
	</span>
</dfn>
