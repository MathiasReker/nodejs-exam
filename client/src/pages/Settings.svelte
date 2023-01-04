<script>
    import { lang } from '../js/stores';
    import Lang from '../components/Util/Lang.svelte';
    import languages from '../js/language';
    import Page from './Page.svelte';
    import LanguageSelector from '../components/UpdateLanguageBtn.svelte';
    import Modal from '../components/modal/UpdateUserFormModal.svelte';
    import ExportUserDataBtn from '../components/ExportUserDataBtn.svelte';
    import DeleteAccountBtn from '../components/DeleteAccountBtn.svelte';

    let title;
    $: title = languages.settings.title[$lang];

    let breadcrumbs;
    $: breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: location.pathname, text: title },
    ];
</script>

<Page breadcrumbs={breadcrumbs} title={title}>
    <div class="pb-5">
        <h1>
            <Lang page="settings" trans="title"></Lang>
        </h1>
        <p class="lead">
            <Lang page="settings" trans="deck"></Lang>
        </p>
    </div>

    <div class="pb-5">
        <h2>
            <Lang page="settings" trans="changeLanguageTitle"></Lang>
        </h2>
        <hr>
        <p>
            <Lang page="settings" trans="changeLanguageDescription"></Lang>
        </p>
        <LanguageSelector/>
    </div>

    <div class="pb-5">
        <h2>
            <Lang page="settings" trans="usernameTitle"></Lang>
        </h2>
        <hr>
        <p>
            <Lang page="settings" trans="usernameDescription"></Lang>
        </p>
        <button class="btn btn-secondary" data-bs-target="#exampleModal" data-bs-toggle="modal" type="button">
            <Lang page="settings" trans="usernameBtn"></Lang>
        </button>
    </div>

    <div class="pb-5">
        <h2>
            <Lang page="settings" trans="exportAccountDataTitle"></Lang>
        </h2>
        <hr>
        <p>
            <Lang page="settings" trans="exportAccountDataDescription"></Lang>
        </p>
        <ExportUserDataBtn/>
    </div>

    <div class="pb-5">
        <h2 class="text-danger">
            <Lang page="settings" trans="deleteAccountTitle"></Lang>
        </h2>
        <hr>
        <p>
            <Lang page="settings" trans="deleteAccountDescription"></Lang>
        </p>
        <DeleteAccountBtn/>
    </div>
</Page>

<Modal/>
