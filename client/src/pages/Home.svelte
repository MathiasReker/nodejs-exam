<script>
    import AutoComplete from 'simple-svelte-autocomplete';
    import AiOutlineCheck from 'svelte-icons-pack/ai/AiOutlineCheck';
    import AiOutlineClose from 'svelte-icons-pack/ai/AiOutlineClose';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import { user } from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import TopBackground from '../components/Layout/TopBackground.svelte';
    import { request } from '../js/fetchWrapper.js';
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
        <div class="row row-cols-1" style="padding-top: 100px">
            {#each wineGlasses as wineGlass}
                <div class="col">
                    <h2 class="text-center">
                        {wineGlass.name}
                        {#if $user && ($user.settings.wineGlasses).includes(wineGlass.name)}
                            <Icon color="green" size="40px" src={AiOutlineCheck}/>
                        {:else}
                            <Icon color="red" size="40px" src={AiOutlineClose}/>
                        {/if}
                    </h2>
                    <img class="img-fluid" src="{wineGlass.image}" alt="">
                </div>
            {/each}
        </div>
    {/if}
</main>
