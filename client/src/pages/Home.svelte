<script>
    import AutoComplete from 'simple-svelte-autocomplete';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FiCheck from 'svelte-icons-pack/fi/FiCheck';
    import FiX from 'svelte-icons-pack/fi/FiX';
    import { onMount } from 'svelte';
    import { lang, user } from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import TopBackground from '../components/Layout/TopBackground.svelte';
    import { request } from '../js/fetchWrapper';
    import Lang from '../components/Util/Lang.svelte';
    import Head from './Head.svelte';
    import languages from '../js/language';
    import { displayError } from '../js/toast';

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

        grapes = fetchGrapes.data.grapes;
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
        const statisticsLookupsFetch = await request(`/api/users/${$user.uuid}/statistics/lookups`, {
          method: 'PUT',
          body: {
            lookups: true,
          },
        });

        $user.statistics = {}; // TODO remove
        $user.statistics.lookups = statisticsLookupsFetch.data.lookups;
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

<Head title="{languages.global.title[$lang]}"/>

<Nav background="{background ?? ''}" color="{color ?? '#FFF'}"/>

<TopBackground/>

<main class="px-3">
    <div class="text-light">
        <h1 class="pt-5">
            <Lang page="home" trans="title"></Lang>
        </h1>
        <p class="pb-3">
            <Lang page="home" trans="subTitle"></Lang>
        </p>
    </div>

    <AutoComplete
            bind:selectedItem={selectedGrape}
            inputClassName="custom-autocomplete-input form-control"
            items={grapes}
            noInputStyles="true"
            noResultsText="{languages.home.selectNoResults[$lang]}"
            onChange={handleOnChange}
    />

    {#if selectedGrape}
        <div class="container" style="padding-top: 100px">
            <div class="row row-cols-1 text-center">
                    <div class="col pb-5">
                        <div class="shadow-lg bg-body rounded-5 mx-5">
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
                                src="{`${wineGlass.image}?h=400`}"
                                alt="{wineGlass.name}"
                                height="400">
                    </div>
            </div>
        </div>
    {/if}
</main>
