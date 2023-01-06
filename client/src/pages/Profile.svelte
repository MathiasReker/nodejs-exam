<script>
    import { link } from 'svelte-navigator';
    import { lang, user } from '../js/stores';
    import { request } from '../js/fetchWrapper';
    import languages from '../js/language';
    import Lang from '../components/Util/Lang.svelte';
    import { displaySuccess } from '../js/toast';
    import Page from './Page.svelte';

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

    (async () => request(`/api/users/${$user.email}/statistics/lookups`, {
      method: 'GET',
    }))()
      .then((res) => {
        lookups = res.data.lookups;
      });

    const title = languages.profile.title[$lang];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: location.pathname, text: title },
    ];

    // TODO statistics -> endpoint change -> "lookup" is the UID!

    const handleOnResetLookups = async () => {
      await request(`/api/users/${$user.email}/statistics/lookups`, {
        method: 'DELETE',
        body: {
          lookups: true,
        },
      }).then((res) => {
        lookups = res.data.lookups;
        displaySuccess('Count lookups has been reset');
      });
    };
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
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
            <button class="btn btn-primary" on:click={handleOnResetLookups}>
                <Lang page="profile" trans="resetStatisticLookupsBtn"/>
            </button>
        </div>
    </div>
</Page>
