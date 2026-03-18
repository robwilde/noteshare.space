<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getCalloutColor, getCalloutIcon } from '$lib/util/callout';
	import CalloutIcon from '$lib/components/CalloutIcon.svelte';

	let {
		title: propTitle = '',
		type: propType = 'note',
		children
	}: { title?: string; type?: string; children?: Snippet } = $props();

	let title = $state('');
	let type = $state('note');
	let color = $state('--callout-warning');
	let icon = $state('note');
	let content = $state<HTMLElement>();

	$effect(() => {
		if (content) {
			const titleElement = content.getElementsByTagName('p')[0];
			if (!titleElement) return;
			const preFilled = propTitle != '';

			if (preFilled) {
				title = propTitle;
				type = propType;
			} else {
				const firstLineHtml = titleElement.innerHTML.split(/<br\s*\/?>/)[0];
				const temp = document.createElement('span');
				temp.innerHTML = firstLineHtml;
				const firstLineText = temp.textContent || '';
				const match = firstLineText.match(/\[!(.+)]([+-]?)(?:\s(.+))?/);
				if (match) {
					type = match[1]?.trim();
					title = match[3]?.trim() ?? type[0].toUpperCase() + type.substring(1).toLowerCase();
				}
			}

			color = `--${getCalloutColor(type)}`;
			icon = getCalloutIcon(type);

			if (!preFilled) {
				const pos = titleElement.innerHTML.indexOf('<br>');
				if (pos >= 0) {
					titleElement.innerHTML = titleElement.innerHTML.substring(pos + 4);
				} else {
					titleElement.innerHTML = '';
				}
			}
}
	});
</script>

<div
	style="--callout-color: var({color})"
	class="border-l-4 border-l-callout bg-zinc-100 dark:bg-zinc-800 my-4"
>
	<div class="p-[10px] bg-callout-bg flex items-center gap-2">
		<span class="callout-icon font-bold text-md text-callout h-5 w-5 inline-block"
			><CalloutIcon {icon} /></span
		>
		<span class="callout-title font-bold text-md">{title}</span>
	</div>
	<div bind:this={content} class="callout-content prose-p:my-0 prose-p:mx-0 py-4 px-3">
		{@render children?.()}
	</div>
</div>
