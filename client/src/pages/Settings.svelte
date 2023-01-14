<script>
    import Page from '../components/page/Page.svelte';
    import LanguageSelector from '../components/button/UpdateLanguageButton.svelte';
    import ExportUserDataBtn from '../components/button/ExportUserDataButton.svelte';
    import DeleteAccountBtn from '../components/button/DeleteAccountButton.svelte';
    import UpdateUserBtn from '../components/button/UpdateUserButton.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('settings.title') },
    ];

</script>

<Page breadcrumbs={breadcrumbs} description="{$t('settings.description')}" title={$t('settings.title')}>

    <div class="mb-5">
        <h3>
            {$t('settings.updateLanguageTitle')}
        </h3>
        <hr>
        <p>
            {$t('settings.updateLanguageDescription')}
        </p>
        <LanguageSelector/>
    </div>

    <div class="mb-5">
        <h3>
            {$t('settings.updateUsernameTitle')}
        </h3>
        <hr>
        <p>
            {$t('settings.updateUsernameDescription')}
        </p>
        <UpdateUserBtn/>
    </div>

    <div class="mb-5">
        <h3>
            {$t('settings.exportUserDataTitle')}
        </h3>
        <hr>
        <p>
            {$t('settings.exportUserDataDescription')}
        </p>
        <ExportUserDataBtn/>
    </div>

    <div>
        <h3 class="text-danger">
            {$t('settings.deleteAccountTitle')}
        </h3>
        <hr>
        <p>
            {$t('settings.deleteAccountDescription')}
        </p>
        <DeleteAccountBtn/>
    </div>
</Page>
