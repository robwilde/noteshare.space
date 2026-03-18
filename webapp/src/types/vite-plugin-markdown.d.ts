declare module 'vite-plugin-markdown' {
	import type { Plugin } from 'vite';
	export function plugin(options?: { mode?: string | string[] }): Plugin;
}
