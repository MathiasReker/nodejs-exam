<script>
    import {apiBaseUrl, user} from '../js/stores';
    import {request} from '../js/fetchWrapper';
    import Lang from '../components/Util/Lang.svelte';
    import languages from '../js/language';
    import Page from './Page.svelte';
    import {displayError, displaySuccess} from "../js/toast.js";

    // TODO csv
    const handleOnSubmitExport = async () => {
        const csv = async () => request(`${$apiBaseUrl}/api/settings/csv`, {
            method: 'GET',
        });
    };

    const title = languages.settings.title[$user.settings.language];

    const breadcrumbs = [
        {href: '/', text: languages.global.home[$user.settings.language]},
        {href: location.pathname, text: title},
    ];

    (() => {
        request(`/api/users/${$user.email}/settings/language`, {
            method: 'PUT',
            body: {
                language: 'da'
            },
        })
            .then((res) => {
                $user.settings.language = res.data.language;

                localStorage.setItem('user', JSON.stringify($user));

                displaySuccess('todo!');
            })
            .catch(() => {
                displayError('Something went wrong...');
            });
    })();
</script>

<Page breadcrumbs={breadcrumbs} title={title}>

    <h1>Settings</h1> <!-- TODO padding bottom -->

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
        <h2 class="text-danger">
            <Lang page="settings" trans="deleteAccountTitle"></Lang>
        </h2>
        <hr>
        <p>
            <Lang page="settings" trans="deleteAccountDescription"></Lang>
        </p>
        <button class="btn btn-danger" type="button">
            <Lang page="settings" trans="deleteAccountBtn"></Lang>
        </button>
    </div>
</Page>
