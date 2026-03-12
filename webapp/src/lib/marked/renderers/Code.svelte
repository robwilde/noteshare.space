<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import hljs from 'highlight.js/lib/common';
	import 'highlight.js/styles/stackoverflow-dark.css';

	import CopyIcon from 'svelte-icons/md/MdContentCopy.svelte';
	import CheckIcon from 'svelte-icons/md/MdCheck.svelte';

	export let lang: string;
	export let text: string;

	let highlighted: string;
	let copied = false;
	let resetTimeout: ReturnType<typeof setTimeout>;

	onMount(() => {
		try {
			if (hljs.getLanguage(lang) !== undefined) {
				highlighted = hljs.highlight(text, { language: lang }).value;
			} else {
				highlighted = text;
			}
		} catch {
			highlighted = text;
		}
	});

	onDestroy(() => {
		clearTimeout(resetTimeout);
	});

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			return;
		}
		copied = true;
		clearTimeout(resetTimeout);
		resetTimeout = setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="code-block">
	<button type="button" class="copy-btn" class:copied on:click={copyToClipboard} aria-label="Copy code">
		{#if copied}
			<CheckIcon />
		{:else}
			<CopyIcon />
		{/if}
	</button>
	<pre class="language-{lang}"><code>{@html highlighted}</code></pre>
</div>

<style>
	.code-block {
		position: relative;
	}

	.copy-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		width: 2rem;
		height: 2rem;
		padding: 0.35rem;
		border: none;
		border-radius: 0.25rem;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s, background 0.15s, color 0.15s;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.code-block:hover .copy-btn,
	.copy-btn:focus-visible {
		opacity: 1;
		pointer-events: auto;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.9);
	}

	.copy-btn.copied {
		opacity: 1;
		pointer-events: auto;
		color: #4ade80;
	}

	@media (hover: none) {
		.copy-btn {
			opacity: 1;
			pointer-events: auto;
		}
	}
</style>
