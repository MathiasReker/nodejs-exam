<script>
    import {baseUrl, user} from "../stores.js";
    import Checkbox from "../components/Checkbox.svelte";

    const fetchWineGlasses = (async () => {
        return await fetch(`${$baseUrl}/api/dashboard/wineGlasses`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "auth-token": $user.token
            },
        }).then(response => response.json());
    })()

    let options = $user.myCollection || [];
</script>

<main class="px-3">
    <h1>My collection of wine glasses</h1>
    <p>Select your wine glasses below..</p>

    <div class="container text-center">
        {#await fetchWineGlasses}
            <p>Loading ...</p>
        {:then data}
            {#each data.data as el}
                <div class="row align-items-center">
                    <div class="col">
                        <div class="form-check form-switch form-check-lg">
                            <Checkbox value="{el.name}" bind:bindGroup={options}></Checkbox>
                        </div>
                    </div>
                    <div class="col-5">
                        {el.name}
                    </div>
                    <div class="col-5">
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
