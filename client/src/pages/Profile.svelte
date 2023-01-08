<script>
    import { link } from 'svelte-navigator';
    import { onMount } from 'svelte';
    import { lang, user } from '../js/stores';
    import { request } from '../js/fetchWrapper';
    import languages from '../js/language';
    import Lang from '../components/Util/Lang.svelte';
    import { displayError, displaySuccess } from '../js/toast';
    import Page from './Page.svelte';

    const ownedWineGlasses = $user.settings.wineGlasses.length;

    let totalWineGlasses = 0;

    let percentOwned = 0;

    let lookups = 0;

    onMount(async () => {
      try {
        const wineGlassesFetch = await request('/api/wineGlasses', {
          method: 'GET',
        });

        totalWineGlasses = wineGlassesFetch.data.length;
        percentOwned = (ownedWineGlasses / totalWineGlasses) * 100;
      } catch (err) {
        displayError(err);
      }

      try {
        const statisticsLookupsFetch = await request(`/api/users/${$user.uuid}/statistics/lookups`, {
          method: 'GET',
        });

        $user.statistics = {}; // TODO remove
        $user.statistics.lookups = statisticsLookupsFetch.data.lookups;
        localStorage.setItem('user', JSON.stringify($user));
        lookups = statisticsLookupsFetch.data.lookups;
      } catch (err) {
        displayError(err);
      }
    });

    const title = languages.profile.title[$lang];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: window.location.pathname, text: title },
    ];

    // TODO statistics -> endpoint change -> "lookup" is the UID!

    const handleOnResetLookups = async () => {
      try {
        const statisticsLookupsFetch = await request(`/api/users/${$user.uuid}/statistics/lookups`, {
          method: 'DELETE',
          body: {
            lookups: true,
          },
        });

        lookups = statisticsLookupsFetch.data.lookups; // TODO handle this variable..
      } catch (err) {
        displayError(err);
      }

      $user.statistics = {}; // TODO remove
      $user.statistics.lookups = lookups;
      localStorage.setItem('user', JSON.stringify($user));
      displaySuccess('Count lookups has been reset');
    };
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <h1>
        <Lang page="profile" trans="title"/>
    </h1>
    <div class="pb-5">
        <Lang page="profile" trans="deck"/>
    </div>

    <div class="card mb-5">
        <h5 class="card-header bg-light text-dark">
            <Lang page="profile" trans="ownedGlassesTitle"/>
        </h5>
        <div class="card-body">
            <p class="card-text">{@html languages.profile.ownedGlassesCardBody[$lang].replace('%s', percentOwned)}</p>
            <div class="progress mb-3" style="height: 20px">
                <div
                        aria-label="20px high"
                        aria-valuemax="100"
                        aria-valuemin="0"
                        aria-valuenow="{percentOwned}"
                        class="progress-bar bg-secondary"
                        role="progressbar"
                        style="width: {percentOwned}%">
                </div>
            </div>
            <a class="btn btn-primary" href="/wine-glasses" use:link>
                <Lang page="profile" trans="updateCollectionBtn"/>
            </a>
        </div>
    </div>

    <div class="card mb-5">
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
