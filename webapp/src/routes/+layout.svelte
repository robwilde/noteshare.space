<script lang="ts">
	import type { Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import NavBarLink from '$lib/components/navbar/NavBarLink.svelte';
	import ThemeToggle from '$lib/components/navbar/ThemeToggle.svelte';
	import LogoGithub from 'svelte-icons/io/IoLogoGithub.svelte';
	import '../app.css';

	let { children }: { children: Snippet } = $props();

	let initialized = $state(false);
	let dark = $state(false);
	let darkTheme = 'dark';

	if (browser) {
		const savedMode = window.localStorage.getItem('isDarkMode');
		dark = savedMode === 'true';
		initialized = true;
	}

	$effect(() => {
		if (browser && initialized) {
			window.localStorage.setItem('isDarkMode', String(dark));
		}
	});
</script>

<svelte:head>
	<title>{import.meta.env.VITE_BRANDING} — Securely share your Obsidian notes with one click.</title
	>
	<meta
		name="title"
		content="Noteshare.space — Securely share your Obsidian notes with one click."
	/>
	<meta
		name="description"
		content="Securely share your Obsidian notes with one click. Zero configuration. End-to-end encrypted. No account needed. Completely open source! Download the QuickShare extension in the Obsidian community plugin marketplace."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://noteshare.space/" />
	<meta
		property="og:title"
		content="Noteshare.space — Securely share your Obsidian notes with one click."
	/>
	<meta
		property="og:description"
		content="Securely share your Obsidian notes with one click. Zero configuration. End-to-end encrypted. No account needed. Completely open source! Download the QuickShare extension in the Obsidian community plugin marketplace."
	/>
	<meta property="og:image" content="https://noteshare.space/meta.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://noteshare.space/" />
	<meta
		property="twitter:title"
		content="Noteshare.space — Securely share your Obsidian notes with one click."
	/>
	<meta
		property="twitter:description"
		content="Securely share your Obsidian notes with one click. Zero configuration. End-to-end encrypted. No account needed. Completely open source! Download the QuickShare extension in the Obsidian community plugin marketplace."
	/>
	<meta property="twitter:image" content="https://noteshare.space/meta.png" />
</svelte:head>

<div class=" h-full {initialized ? '' : 'hidden'} {dark ? darkTheme : ''}">
	<div class="bg-white dark:bg-background-dark min-h-full transition-colors">
		<div class="z-50 sticky top-0 w-full bg-white dark:bg-background-dark transition-colors">
			<div class="top-0 left-0 right-0">
				<NavBar>
					{#snippet left()}
						<NavBarLink href="/about">About</NavBarLink>
						<NavBarLink href="/install">Get plugin</NavBarLink>
						<NavBarLink href="/contact">Contact</NavBarLink>
					{/snippet}
					{#snippet right()}
						<NavBarLink href="https://obsidian.md"
							><span class="text-[#705dcf] font-bold">Get Obsidian</span></NavBarLink
						>
						<NavBarLink href="https://github.com/mcndt/noteshare.space">
							<span class="flex gap-2 items-center justify-center">
								<span class="text-black dark:text-zinc-200 md:hidden whitespace-nowrap">GitHub</span
								>
								<span
									class="inline-block h-6 w-6 text-black dark:text-zinc-200 md:dark:text-zinc-300"
									><LogoGithub /></span
								>
							</span>
						</NavBarLink>
						<ThemeToggle bind:dark />
					{/snippet}
				</NavBar>
			</div>
		</div>

		<div class="container mx-auto {page.url.pathname.startsWith('/note/') ? '' : 'max-w-4xl'} mt-6 md:mt-12 px-4 2xl:px-0">
			{@render children()}
			<div class="mt-12">
				<Footer />
			</div>
		</div>
	</div>
</div>
