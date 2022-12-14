<script>
    import AutoComplete from "simple-svelte-autocomplete"
    import {baseUrl, user} from "../stores.js";

    let colors = ['Blauburgunder', 'Moulin à vent', 'Nebbiolo', 'Nerello Mascalese', 'Echézeaux', 'Beaujolais Cru', 'Barbaresco', 'Volnay', 'Blanc de Noirs', 'Romanée Saint Vivant', 'Musigny', 'Chambolle Musigny', 'Vougeot', 'Rosé Champagne', 'Vosne-Romanée', 'Nuits Saint Georges', 'Pinot Noir New World', 'St. Aubin', 'Pinot Noir Old World', 'Burgundy (red)', 'Pommard', 'Barolo', 'Santenay', 'Pomerol', 'St. Julien', 'Fronsac', 'St. Estèphe', 'Petit Verdot', 'Merlot', 'Margaux', 'Pauillac', 'Brunello di Montalcino', 'Montepulciano', 'Cabernet Franc', 'Pessac Leognan (Rouge)', 'Graves rouge', 'Médoc', 'Cabernet Sauvignon', 'Carménère', 'St. Emilion', 'Bordeaux (red)', 'Listrac'];

    let selectedGrape;

    let list = [];

    async function onChange() {
        if (!selectedGrape) {
            return;
        }

        const wineGlasses = async () => {
            return await fetch(`${$baseUrl}/api/wineGlasses?grape=${encodeURIComponent(selectedGrape)}`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "auth-token": $user.token
                },
            }).then(response => response.json());
        };

        const result = await wineGlasses();

        list = [];
        result.data.forEach(el => {
            list.push(el);
        })
    }
</script>

<main class="px-3 flex-shrink-0">
    <h1 class="pt-5">Find the wine glass</h1>
    <p class="pb-3">Select a grape from the list below</p>

    <AutoComplete bind:selectedItem={selectedGrape} className="test" items={colors} onChange={onChange}/>

    {#if selectedGrape}
        <div class="row row-cols-1 pt-5">
            {#each list as el}
                <div class="col">
                    <p class="h3 text-center">{el.name}</p>
                    <img class="img-fluid" src="{el.image}" alt="">
                </div>
            {/each}
        </div>
    {/if}
</main>
