<script>
    import AutoComplete from 'simple-svelte-autocomplete';
    import AiOutlineCheck from 'svelte-icons-pack/ai/AiOutlineCheck';
    import AiOutlineClose from 'svelte-icons-pack/ai/AiOutlineClose';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import {baseUrl, user} from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import TopBackground from '../components/Layout/TopBackground.svelte';

    let grapes = [];

    let selectedGrape;

    let wineGlasses = [];

    (async () => await fetch(`${$baseUrl}/api/grapes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': $user.token,
        },
    })
        .then((response) => response.json()))()
        .then((response) => {
            grapes = response.data.grapes;
        });

    const onChange = async () => {
        if (!selectedGrape) {
            return;
        }

        (async () => await fetch(`${$baseUrl}/api/wineGlasses?grape=${encodeURIComponent(selectedGrape)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': $user.token,
            },
        }).then((response) => response.json()))()
            .then((response) => {
                wineGlasses = [];
                response.data.forEach((wineGlass) => {
                    wineGlasses.push(wineGlass);
                });
            });

        // Update statistics
        await (async () => {
            await fetch(`${$baseUrl}/api/users/${$user.email}/statistics`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': $user.token,
                },
                body: JSON.stringify({
                    lookup: true
                })
            }).then((response) => response.json());
        })();
    };

    const color = '#EBD4CC';
    const background = '';
</script>

<Nav background="{background}" color="{color}"/>

<TopBackground/>

<main>
    <div class="text-light">
        <h1 class="pt-5">Find the wine glass</h1>
        <p class="pb-3">Select a grape from the list below</p>
    </div>

    <AutoComplete
            bind:selectedItem={selectedGrape}
            inputClassName="custom-autocomplete-input form-control"
            items={grapes}
            noInputStyles="true"
            onChange={onChange}
    />

    {#if selectedGrape}
        <div class="row row-cols-1 pt-5">
            {#each wineGlasses as wineGlass}
                <div class="col">
                    <h2 class="text-center">
                        {wineGlass.name}
                        {#if ($user.settings.wineGlasses).includes(wineGlass.name)}
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
