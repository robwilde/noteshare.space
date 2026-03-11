/// <reference types="@sveltejs/kit" />

declare namespace App {}

declare module 'svelte-icons/*' {
	import type { SvelteComponent } from 'svelte';
	export default class extends SvelteComponent {}
}
