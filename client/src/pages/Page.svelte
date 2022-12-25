<script>
    import Head from './Head.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Layout/Breadcrumbs.svelte';

    export let items;

    export let title;
</script>

<Head title="{title}"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <slot/>
</main>
