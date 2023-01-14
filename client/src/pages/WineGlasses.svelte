<script>
    import { user } from '../js/user.js';
    import Checkbox from '../components/switch/WineGlassesSwitch.svelte';
    import { request } from '../js/fetch-wrapper';
    import Page from '../components/page/Page.svelte';
    import { t } from '../js/localization';
    import { displayError } from '../js/toast';

    let options = $user.settings.wineGlasses || [];

    const wineGlasses = (() => request('/api/wineGlasses', {
      method: 'GET',
    }))();

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('wineGlasses.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" description="{$t('wineGlasses.description')}" title="{$t('wineGlasses.title')}">

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
        {:catch err}
            {displayError($t('global.error'))}
        {/await}
    </div>
</Page>

<style>
    .mb-5-nl:not(:last-child) {
        margin-bottom: 3rem !important;
    }
</style>
