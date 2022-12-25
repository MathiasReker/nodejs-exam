<script>
    import { link } from 'svelte-navigator';
    import Nav from '../components/Layout/Nav.svelte';
    import { lang, user } from '../js/stores';
    import Breadcrumbs from '../components/Layout/Breadcrumbs.svelte';
    import { request } from '../js/fetchWrapper';
    import Head from './Head.svelte';
    import { languages } from '../js/language';
    import Lang from '../components/Util/Lang.svelte';
    import { displaySuccess } from '../js/toast';

    const ownedWineGlasses = $user.settings.wineGlasses.length;

    let totalWineGlasses = 0;

    let percentOwned = 0;

    let lookups = 0;

    (async () => request('/api/wineGlasses', {
      method: 'GET',
    }))()
      .then((res) => {
        totalWineGlasses = res.data.length;
        percentOwned = ownedWineGlasses / totalWineGlasses * 100;
      });

    (async () => request(`/api/users/${$user.email}/statistics`, {
      method: 'GET',
    }))()
      .then((res) => {
        lookups = res.data.lookups;
      });

    const items = [
      { href: '/', text: languages.global.home[$lang] },
      { href: '/profile', text: languages.profile.title[$lang] },
    ];

    // TODO statistics -> endpoint change -> "lookup" is the UID!

    const handleOnResetLookups = async () => {
      await request(`/api/users/${$user.email}/statistics`, {
        method: 'DELETE',
        body: {
          lookup: true,
        },
      }).then((res) => {
        lookups = res.data.lookups;
        displaySuccess('Count lookups has been reset');
      });
    };
</script>

<Head title="Profile"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <h1>
        <Lang page="profile" trans="title"/>
    </h1>
    <div class="pb-5">
        <Lang page="profile" trans="deck"/>
    </div>

    <div class="card mb-4">
        <h5 class="card-header bg-light text-dark">
            <Lang page="profile" trans="ownedGlassesTitle"/>
        </h5>
        <div class="card-body">
            <p class="card-text">{@html languages.profile.ownedGlassesCardBody[$lang].replace('%s', percentOwned)}</p>
            <div class="progress mb-3" style="height: 20px;">
                <div aria-label="20px high" aria-valuemax="100" aria-valuemin="0" aria-valuenow="{percentOwned}"
                     class="progress-bar bg-secondary" role="progressbar" style="width: {percentOwned}%;"></div>
            </div>
            <a class="btn btn-primary" href="/wine-glasses" use:link>
                <Lang page="profile" trans="updateCollectionBtn"/>
            </a>
        </div>
    </div>

    <div class="card mb-4">
        <h5 class="card-header bg-light text-dark">
            <Lang page="profile" trans="countLookupsTitle"/>
        </h5>
        <div class="card-body">
            <p class="card-text">{@html languages.profile.countLookupsCardBody[$lang].replace('%s', lookups)}</p>
            <btn class="btn btn-primary" on:click={handleOnResetLookups}>
                <Lang page="profile" trans="resetStatisticLookupsBtn"/>
            </btn>
        </div>
    </div>
</main>
