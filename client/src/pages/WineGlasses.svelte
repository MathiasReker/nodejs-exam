<script>
    import { user } from '../js/stores';
    import Checkbox from '../components/Checkbox/WineGlassesSwitch.svelte';
    import { request } from '../js/fetch-wrapper';
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    let options = $user.settings.wineGlasses || [];

    const wineGlasses = (() => request('/api/wineGlasses', {
      method: 'GET',
    }))();

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('wineGlasses.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('wineGlasses.title')}">
    <h1>
        {$t('wineGlasses.title')}
    </h1>
    <p class="lead">
        {$t('wineGlasses.description')}
    </p>

    <div class="text-center">
        {#await wineGlasses}
            <div class="text-center">
                <div class="spinner-border" role="status"></div>
            </div>
        {:then res}
            {#each res.data as wineGlass}
                <div class="row align-items-center mb-5-nl">
                    <div class="col-3">
                        <Checkbox value="{wineGlass.name}" bind:bindGroup={options}/>
                    </div>
                    <div class="col-6 text-start lead">
                        {wineGlass.name}
                    </div>
                    <div class="col-3 text-right">
                        <img
                                crossorigin="anonymous"
                                src="{`${import.meta.env.VITE_API_BASE_URL}${wineGlass.image}?height=130`}"
                                alt="{wineGlass.name}"
                                height="130">
                    </div>
                </div>
            {/each}
        {:catch error}
            <p class="text-danger">{error.message}</p>
        {/await}
    </div>
</Page>

<style>
    .mb-5-nl:not(:last-child) {
        margin-bottom: 3rem !important;
    }
</style>
