<script>
    import Head from '../layout/Head.svelte';
    import Nav from '../layout/Nav.svelte';
    import Breadcrumbs from '../layout/Breadcrumbs.svelte';

    export let breadcrumbs = [];
    export let title;
    export let description;
</script>

<Head title="{title}"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs bind:breadcrumbs={breadcrumbs}/>

    {#if title}
        <h1>
            {title}
        </h1>
    {/if}

    {#if description}
        <div class="pb-5">
            {description}
        </div>
    {/if}

    <slot/>
</main>
