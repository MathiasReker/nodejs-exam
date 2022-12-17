<script>
    import Nav from "../components/Layout/Nav.svelte";
    import {link} from "svelte-navigator";
    import {baseUrl, user} from "../stores.js";

    let ownedWineGlasses = $user.myCollection.length;

    let totalWineGlasses = 0;

    let percentOwned = 0;

    (async () => {
        return await fetch(`${$baseUrl}/api/wineGlasses`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "auth-token": $user.token
            },
        }).then(response => response.json());
    })().then((response) => {
        totalWineGlasses = response.data.length;
        percentOwned = ownedWineGlasses / totalWineGlasses * 100;
    })

</script>

<Nav/>

<main>
    <h1>Profile</h1>
    <div>In here you can see stats for your account. Also, you </div>

    <div>You own {percentOwned}% of the collection!</div>

    <div class="progress" style="height: 20px;">
        <div aria-label="Example 20px high" aria-valuemax="100" aria-valuemin="0" aria-valuenow="{percentOwned}"
             class="progress-bar" role="progressbar" style="width: {percentOwned}%;"></div>
    </div>

    <a class="btn btn-primary mt-3" href="/wine-glasses" use:link> Update collection</a>

</main>