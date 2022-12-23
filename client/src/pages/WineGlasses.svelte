<script>
    import { user, lang } from '../js/stores';
    import Checkbox from '../components/Checkbox.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';
    import { request } from '../js/fetchWrapper.js';
    import Lang from '../components/Lang.svelte';
    import Head from './Head.svelte';
    import { languages } from '../js/language.js';

    let options = $user.settings.wineGlasses || [];

    const wineGlasses = (() => request('/api/wineGlasses', {
      method: 'GET',
    }))();

    const items = [
      { href: '/', text: 'Home' },
      { href: '/wine-glasses', text: 'Wineglasses' },
    ];
</script>

<Head title="{languages.wineGlasses.title[$lang]}"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>
    <h1>
        <Lang page="wineGlasses" trans="title"></Lang>
    </h1>
    <p class="lead">
        <Lang page="wineGlasses" trans="deck"></Lang>
    </p>

    <div class="text-center">
        {#await wineGlasses}
            <p>Loading ...</p> <!-- TODO: use spinner -->
        {:then res}
            {#each res.data as wineGlass}
                <div class="row align-items-center">
                    <div class="col-3">
                        <Checkbox value="{wineGlass.name}" bind:bindGroup={options}></Checkbox>
                    </div>
                    <div class="col-5">
                        {wineGlass.name}
                    </div>
                    <div class="col-4 text-right">
                        <img alt=""
                             class="img-fluid"
                             src="{wineGlass.image}">
                    </div>
                </div>
            {/each}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</main>
