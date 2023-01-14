<script>
    import { link } from 'svelte-navigator';
    import { onMount } from 'svelte';
    import { user } from '../js/stores';
    import { request } from '../js/fetch-wrapper';
    import { displayError, displaySuccess } from '../js/toast';
    import Page from './Page.svelte';
    import { t } from '../js/localization';
    import ProgressBar from '../components/ProgressBar.svelte';
    import Card from '../components/Card.svelte';

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
        displayError($t('global.error'));
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
        displayError($t('global.error'));
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
        displayError($t('global.error'));
      }
    };

    const { language } = navigator;
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const accountCreateAt = new Date($user.createdAt).toLocaleDateString(language, { timeZone });
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('profile.title')}" description="{$t('profile.description')}">
    <Card title="{$t('profile.ownedWineGlassesTitle')}">
        <p class="card-text">{@html $t('profile.ownedGlassesDescription', { percentOwned })}</p>
        <ProgressBar valueNow={percentOwned} valueTotal={percentOwned}/>
        <a class="btn btn-primary" href="/wine-glasses" use:link>
            {$t('profile.updateCollectionBtn')}
        </a>
    </Card>

    <Card title="{$t('profile.countLookupsTitle')}">
        <p class="card-text">
            {@html $t('profile.countLookupsCardBody', { lookups: $user.statistics.lookups })}
        </p>
        <button class="btn btn-primary" on:click={handleOnResetLookups}>
            {$t('profile.resetStatisticsLookupsBtn')}
        </button>
    </Card>

    <Card title="{$t('profile.accountTitle')}">
        {$t('profile.accountCreatedAt', { accountCreateAt })}
    </Card>
</Page>
