<script>
    import { link } from 'svelte-navigator';
    import Nav from '../components/Layout/Nav.svelte';
    import { baseUrl, user } from '../js/stores';
    import Pagination from '../components/Pagination.svelte';
    import { request } from '../js/fetchWrapper.js';

    const ownedWineGlasses = $user.settings.wineGlasses.length;

    let totalWineGlasses = 0;

    let percentOwned = 0;

    let lookups = 0;

    (async () => await request('/api/wineGlasses', {
      method: 'GET',
    }))()
      .then((res) => {
        totalWineGlasses = res.data.length;
        percentOwned = ownedWineGlasses / totalWineGlasses * 100;
      });

    (async () => await request(`/api/users/${$user.email}/statistics`, {
      method: 'GET',
    }))()
      .then((res) => {
        lookups = res.data.lookups;
      });
</script>

<Nav/>

<main>
    <Pagination page="Profile"/>

    <h1>Profile</h1>
    <div>In here you can see stats for your account. Also, you</div>

    <div>You own {percentOwned}% of the wine glasses!</div>

    <div class="progress" style="height: 20px;">
        <div aria-label="Example 20px high" aria-valuemax="100" aria-valuemin="0" aria-valuenow="{percentOwned}"
             class="progress-bar" role="progressbar" style="width: {percentOwned}%;"></div>
    </div>

    <a class="btn btn-primary mt-3" href="/wine-glasses" use:link> Update collection</a>

    <div>You have lookup up a glass: {lookups}</div>
</main>
