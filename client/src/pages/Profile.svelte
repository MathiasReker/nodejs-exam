<script>
    import { link } from 'svelte-navigator';
    import Nav from '../components/Layout/Nav.svelte';
    import { lang, user } from '../js/stores';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';
    import { request } from '../js/fetchWrapper';
    import Head from './Head.svelte';
    import { languages } from '../js/language';
    import Lang from '../components/Lang.svelte';
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
    <div class="py-3">
        <Lang page="profile" trans="deck"/>
    </div>

    <div class="card mb-3">
        <div class="card-header">
            Owned glasses
        </div>
        <div class="card-body">
            <p class="card-text">{@html languages.profile.test[$lang].replace('%s', percentOwned)}</p>
            <div class="progress mb-3" style="height: 20px;">
                <div aria-label="20px high" aria-valuemax="100" aria-valuemin="0" aria-valuenow="{percentOwned}"
                     class="progress-bar bg-secondary" role="progressbar" style="width: {percentOwned}%;"></div>
            </div>
            <a class="btn btn-primary" href="/wine-glasses" use:link>
                <Lang page="profile" trans="updateCollectionBtn"/>
            </a>
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            Count lookups
        </div>
        <div class="card-body">
            <p class="card-text">You have lookup up a glass: <strong>{lookups}</strong></p>
            <btn class="btn btn-primary" on:click={handleOnResetLookups}>
                <Lang page="profile" trans="resetStatisticLookupsBtn"/>
            </btn>
        </div>
    </div>
</main>
