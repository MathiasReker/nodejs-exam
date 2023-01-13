<script>
    import { link } from 'svelte-navigator';
    import { onMount } from 'svelte';
    import { user } from '../js/stores';
    import { request } from '../js/fetch-wrapper';
    import { displayError, displaySuccess } from '../js/toast';
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    const ownedWineGlasses = $user.settings.wineGlasses.length;
    let totalWineGlasses = 0;
    let percentOwned = 0;

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
        const statisticsLookupsFetch = await request('/api/users/me/statistics/lookups', {
          method: 'GET',
        });

        $user.statistics = {};
        $user.statistics.lookups = statisticsLookupsFetch.data.lookups;
        localStorage.setItem('user', JSON.stringify($user));
        $user.statistics.lookups = statisticsLookupsFetch.data.lookups;
      } catch (err) {
        displayError(err);
      }
    });

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('profile.title') },
    ];

    const handleOnResetLookups = async () => {
      try {
        const statisticsLookupsFetch = await request('/api/users/me/statistics/lookups', {
          method: 'DELETE',
          body: {
            lookups: true,
          },
        });

        $user.statistics.lookups = statisticsLookupsFetch.data.lookups;
        localStorage.setItem('user', JSON.stringify($user));

        displaySuccess($t('profile.countLookupsDisplaySuccess'));
      } catch (err) {
        displayError(err);
      }
    };

    const { language } = navigator;
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const accountCreateAt = new Date($user.createdAt).toLocaleDateString(language, { timeZone });
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('profile.title')}">
    <h1>
        {$t('profile.title')}
    </h1>
    <div class="pb-5">
        {$t('profile.description')}
    </div>

    <div class="card mb-5">
        <h5 class="card-header bg-light text-dark">
            {$t('profile.ownedWineGlassesTitle')}
        </h5>
        <div class="card-body">
            <p class="card-text">{@html $t('profile.ownedGlassesDescription', { percentOwned })}</p>
            <div class="progress mb-3" style="height: 20px"> <!-- todo component -->
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
                {$t('profile.updateCollectionBtn')}
            </a>
        </div>
    </div>

    <div class="card mb-5">
        <h5 class="card-header bg-light text-dark">
            {$t('profile.countLookupsTitle')}
        </h5>
        <div class="card-body">
            <p class="card-text">
                {@html $t('profile.countLookupsCardBody', { lookups: $user.statistics.lookups })}
            </p>
            <button class="btn btn-primary" on:click={handleOnResetLookups}>
                {$t('profile.resetStatisticsLookupsBtn')}
            </button>
        </div>
    </div>

    <div class="card mb-5">
        <h5 class="card-header bg-light text-dark">
            Account <!-- TOOD -->
        </h5>
        <div class="card-body">
            <p>Your account was created {accountCreateAt}.</p> <!-- TOOD -->
        </div>
    </div>
</Page>
