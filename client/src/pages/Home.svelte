<script>
    import AutoComplete from 'simple-svelte-autocomplete';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FiCheck from 'svelte-icons-pack/fi/FiCheck';
    import FiX from 'svelte-icons-pack/fi/FiX';
    import {user} from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import TopBackground from '../components/Layout/TopBackground.svelte';
    import {request} from '../js/fetchWrapper.js';
    import Lang from '../components/Lang.svelte';
    import Head from './Head.svelte';

    let grapes = [];

    let selectedGrape;

    let wineGlasses = [];

    let color;

    let background;

    (async () => await request('/api/grapes', {
        method: 'GET',
    }))().then((res) => {
        grapes = res.data.grapes;
    });

    const onChange = async () => {
        if (!selectedGrape) {
            return;
        }

        await request('/api/wineGlasses', {
            method: 'GET',
            query: `grape=${selectedGrape}`,
        }).then((res) => {
            wineGlasses = res.data;
        });

        await request(`/api/users/${$user.email}/statistics`, {
            method: 'PUT',
            body: {
                lookup: true,
            },
        });

        await request('/api/messages', {
            method: 'POST',
            body: {
                email: $user.email,
                grape: selectedGrape,
            },
        });
    };
</script>

<Head title="Wine Glass Guide"/>

<Nav background="{background ?? ''}" color="{color ?? '#EBD4CC'}"/>

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
            onChange={onChange}
    />

    {#if selectedGrape}
        <div class="container" style="padding-top: 100px">
            <div class="row row-cols-1 text-center">
                {#each wineGlasses as wineGlass}
                    <div class="col">
                        <div class="shadow-lg bg-body rounded-5 mx-5">
                            <h2 class=" h3 py-2">{wineGlass.name}
                                {#if $user && ($user.settings.wineGlasses).includes(wineGlass.name)}
                                    <Icon color="green" size="22px" src={FiCheck}/>
                                {:else}
                                    <Icon color="red" size="22px" src={FiX}/>
                                {/if}
                            </h2>
                        </div>

                    </div>
                    <div class="col" style="z-index: -1">
                        <img class="img-fluid" width="600" height="600" src="{wineGlass.image}" alt="">
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</main>
