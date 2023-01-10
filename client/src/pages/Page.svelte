<script>
    import Head from './Head.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Layout/Breadcrumbs.svelte';

    export let breadcrumbs = [];
    export let title;
</script>

<Head title="{title}"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs bind:breadcrumbs={breadcrumbs}/>

    <slot/>
</main>
