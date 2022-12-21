<script>
    import { baseUrl, user } from '../js/stores';
    import Checkbox from '../components/Checkbox.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Pagination from '../components/Pagination.svelte';
    import { request } from '../js/fetchWrapper.js';

    let options = $user.settings.wineGlasses || [];

    const fetchWineGlasses = (() => request('/api/wineGlasses', {
      method: 'GET',
    }))();
</script>

<Nav/>

<main class="px-3">
    <Pagination page="Wine glasses"/>

    <h1>My collection of wine glasses</h1>
    <p>Select your wine glasses below..</p>

    <div class="text-center">
        {#await fetchWineGlasses}
            <p>Loading ...</p> <!-- TODO: use spinner -->
        {:then response}
            {#each response.data as wineGlass}
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
