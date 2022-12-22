<script>
    import { link } from 'svelte-navigator';

    export let items = [];
</script>

<nav aria-label="breadcrumb" class="pb-3">
    <ol class="breadcrumb">
        {#each items as item, i}
            {#if i === items.length - 1}
                <li aria-current="page" class="breadcrumb-item active">{item.text}</li>
            {:else}
                <li class="breadcrumb-item"><a href="{item.href}" use:link>{item.text}</a></li>
            {/if}
        {/each}
    </ol>
</nav>
