<script>
    import { apiBaseUrl, lang } from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import { request } from '../js/fetchWrapper.js';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';
    import Lang from '../components/Lang.svelte';
    import Head from './Head.svelte';
    import { languages } from '../js/language.js';

    // TODO csv
    const handleOnSubmitExport = async () => {
      const csv = async () => await request(`${$apiBaseUrl}/api/settings/csv`, {
        method: 'GET',
      });
    };

    const items = [
      { href: '/', text: 'Home' },
      { href: '/settings', text: 'Settings' },
    ];
</script>

<Head title="{languages.settings.title[$lang]}"></Head>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <div>
        <h2>
            <Lang page="settings" trans="usernameTitle"></Lang>
        </h2>
        <hr>
        <p>
            <Lang page="settings" trans="usernameDescription"></Lang>
        </p>
        <button class="btn btn-secondary" type="button">
            <Lang page="settings" trans="usernameBtn"></Lang>
        </button>
    </div>

    <div class="pt-5">
        <h2>
            <Lang page="settings" trans="exportAccountDataTitle"></Lang>
        </h2>
        <hr>
        <p>
            <Lang page="settings" trans="exportAccountDataDescription"></Lang>
        </p>
        <button
                class="btn btn-secondary"
                on:submit|preventDefault={handleOnSubmitExport}
                type="button">
            <Lang page="settings" trans="exportAccountDataBtn"></Lang>
        </button>
    </div>

    <div class="pt-5">
        <h2 class="text-danger"><Lang page="settings" trans="deleteAccountTitle"></Lang></h2>
        <hr>
        <p><Lang page="settings" trans="deleteAccountDescription"></Lang></p>
        <button class="btn btn-danger" type="button"><Lang page="settings" trans="deleteAccountBtn"></Lang></button>
    </div>
</main>
