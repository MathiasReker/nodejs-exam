<script>
    import { link } from 'svelte-navigator';

    export let page;
</script>

<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/" use:link>Home</a></li>
        <li aria-current="page" class="breadcrumb-item active">{page}</li>
    </ol>
</nav>
