<script>
    import { apiBaseUrl, lang, user } from '../js/stores';
    import Checkbox from '../components/Checkbox/Checkbox.svelte';
    import { request } from '../js/fetchWrapper';
    import Lang from '../components/Util/Lang.svelte';
    import languages from '../js/language';
    import Page from './Page.svelte';

    let options = $user.settings.wineGlasses || [];

    const wineGlasses = (() => request('/api/wineGlasses', {
      method: 'GET',
    }))();

    const title = languages.wineGlasses.title[$lang];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: window.location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <h1>
        <Lang page="wineGlasses" trans="title"></Lang>
    </h1>
    <p class="lead">
        <Lang page="wineGlasses" trans="deck"></Lang>
    </p>

    <div class="text-center">
        {#await wineGlasses}
            <div class="text-center">
                <div class="spinner-border" role="status"></div>
            </div>
        {:then res}
            {#each res.data as wineGlass}
                <div class="row align-items-center pb-5">
                    <div class="col-3">
                        <Checkbox value="{wineGlass.name}" bind:bindGroup={options}/>
                    </div>
                    <div class="col-6 text-start lead">
                        {wineGlass.name}
                    </div>
                    <div class="col-3 text-right">
                        <img
                                crossorigin="anonymous"
                                src="{`${$apiBaseUrl}${wineGlass.image}?h=130`}"
                                alt="{wineGlass.name}"
                                height="130">
                    </div>
                </div>
            {/each}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</Page>
