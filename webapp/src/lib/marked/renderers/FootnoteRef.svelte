<script lang="ts">
	import { scrollToId } from '$lib/util/scrollToId';

	let { id }: { id: string } = $props();
</script>

<sup
	><a
		onclick={(e) => { e.preventDefault(); scrollToId(`footnote-${id}`); }}
		id="footnote-ref-{id}"
		href="#footnote-{id}">[{id}]</a
	></sup
>
