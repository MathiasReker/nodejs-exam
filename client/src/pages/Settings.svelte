<script>
    import Page from './Page.svelte';
    import LanguageSelector from '../components/UpdateLanguageBtn.svelte';
    import ExportUserDataBtn from '../components/ExportUserDataBtn.svelte';
    import DeleteAccountBtn from '../components/DeleteAccountBtn.svelte';
    import UpdateUserBtn from '../components/UpdateUserBtn.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('settings.title') },
    ];
</script>

<Page breadcrumbs={breadcrumbs} title={$t('settings.title')} description="{$t('settings.description')}">

    <div class="mb-5">
        <h2>
            {$t('settings.updateLanguageTitle')}
        </h2>
        <hr>
        <p>
            {$t('settings.updateLanguageDescription')}
        </p>
        <LanguageSelector/>
    </div>

    <div class="mb-5">
        <h2>
            {$t('settings.updateUsernameTitle')}
        </h2>
        <hr>
        <p>
            {$t('settings.updateUsernameDescription')}
        </p>
        <UpdateUserBtn/>
    </div>

    <div class="mb-5">
        <h2>
            {$t('settings.exportUserDataTitle')}
        </h2>
        <hr>
        <p>
            {$t('settings.exportUserDataDescription')}
        </p>
        <ExportUserDataBtn/>
    </div>

    <div>
        <h2 class="text-danger">
            {$t('settings.deleteAccountTitle')}
        </h2>
        <hr>
        <p>
            {$t('settings.deleteAccountDescription')}
        </p>
        <DeleteAccountBtn/>
    </div>
</Page>
