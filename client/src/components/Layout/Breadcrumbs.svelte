<script>
    import { link } from 'svelte-navigator';

    export let breadcrumbs = [];
</script>

<nav aria-label="breadcrumb" class="pb-3">
    <ol class="breadcrumb">
        {#each breadcrumbs as breadcrumb, i}
            {#if i === breadcrumbs.length - 1}
                <li aria-current="page" class="breadcrumb-item active">{breadcrumb.text}</li>
            {:else}
                <li class="breadcrumb-item"><a href="{breadcrumb.href}" use:link>{breadcrumb.text}</a></li>
            {/if}
        {/each}
    </ol>
</nav>
