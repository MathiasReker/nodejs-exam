<script>
    import AutoComplete from 'simple-svelte-autocomplete';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FiCheck from 'svelte-icons-pack/fi/FiCheck';
    import FiX from 'svelte-icons-pack/fi/FiX';
    import { onMount } from 'svelte';
    import { user } from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import TopBackground from '../components/Layout/TopBackground.svelte';
    import { request } from '../js/fetch-wrapper.js';
    import Head from './Head.svelte';
    import { displayError } from '../js/toast';
    import { t } from '../js/localization';

    let grapes = [];
    let selectedGrape;
    let wineGlass = {};
    let color;
    let background;

    onMount(async () => {
      try {
        const fetchGrapes = await request('/api/grapes', {
          method: 'GET',
        });

        grapes = fetchGrapes.data;
      } catch (err) {
        displayError(err);
      }
    });

    const handleOnChange = async () => {
      if (!selectedGrape) {
        return;
      }

      try {
        const wineGlassFetch = await request(`/api/wineGlasses/${selectedGrape}`, {
          method: 'GET',
        });

        wineGlass = wineGlassFetch.data;
      } catch (err) {
        displayError(err);
      }

      try {
        const statisticsLookupsFetch = await request('/api/users/me/statistics/lookups', {
          method: 'PUT',
          body: {
            lookups: true,
          },
        });

        $user.statistics = {
          lookups: statisticsLookupsFetch.data.lookups,
        };
        localStorage.setItem('user', JSON.stringify($user));
      } catch (err) {
        displayError(err);
      }

      try {
        await request('/api/messages', {
          method: 'POST',
          body: {
            email: $user.email,
            grape: selectedGrape,
          },
        });
      } catch (err) {
        displayError(err);
      }
    };
</script>

<Head title="{$t('global.title')}" metaTitle="{$t('global.title')}" metaDescription="{$t('global.title')}"/>

<Nav background="{background ?? ''}" color="{color ?? '#FFF'}" sticky="{false}"/>

<TopBackground/>

<main class="px-3">
    <div class="text-light">
        <h1 class="pt-5">
            {$t('home.title')}
        </h1>
        <p class="pb-3">
            {$t('home.subTitle')}
        </p>
    </div>

    <AutoComplete
            bind:selectedItem={selectedGrape}
            inputClassName="custom-autocomplete-input form-control"
            items={grapes}
            noInputStyles="true"
            noResultsText="{$t('home.noResults')}"
            onChange={handleOnChange}
    />

    {#if selectedGrape}
        <div class="container" style="padding-top: 100px">
            <div class="row row-cols-1 text-center">
                <div class="col pb-5">
                    <div class="shadow-lg bg-body rounded-5 mx-4">
                        <h2 class="h3 py-2">{wineGlass.name}
                            {#if $user && ($user.settings.wineGlasses).includes(wineGlass.name)}
                                <span style="color: {color}" class="align-items-center">
                                    <Icon color="#48bb8f" size="22px" src={FiCheck}/>
                                </span>
                            {:else}
                                <span style="color: {color}" class="align-items-center">
                                    <Icon color="#8d2100" size="22px" src={FiX}/>
                                </span>
                            {/if}
                        </h2>
                    </div>
                </div>
                <div class="col" style="z-index: -1">
                    <img
                            crossorigin="anonymous"
                            src="{`${wineGlass.image}?height=350`}"
                            alt="{wineGlass.name}"
                            height="350">
                </div>
            </div>
        </div>
    {/if}
</main>
