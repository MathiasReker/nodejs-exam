<script>
    import { baseUrl, user } from '../js/stores';
    import Checkbox from '../components/Checkbox.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Pagination from '../components/Pagination.svelte';

    let options = $user.settings.wineGlasses || [];

    const fetchWineGlasses = (async () => await fetch(`${$baseUrl}/api/wineGlasses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': $user.token,
      },
    }).then((response) => response.json()))();
</script>

<Nav/>

<main class="px-3">
    <Pagination page="Wine glasses"/>

    <h1>My collection of wine glasses</h1>
    <p>Select your wine glasses below..</p>

    <div class="container text-center">
        {#await fetchWineGlasses}
            <p>Loading ...</p>
        {:then data}
            {#each data.data as el}
                <div class="row align-items-center">
                    <div class="col-3">
                        <div class="form-check form-switch form-check-lg">
                            <Checkbox value="{el.name}" bind:bindGroup={options}></Checkbox>
                        </div>
                    </div>
                    <div class="col-5">
                        {el.name}
                    </div>
                    <div class="col-4 text-right">
                        <img alt=""
                             class="img-fluid"
                             src="{el.image}">
                    </div>
                </div>
            {/each}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
    {options}
</main>
