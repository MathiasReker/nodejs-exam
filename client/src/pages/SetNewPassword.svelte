<script>
    import { Link } from 'svelte-navigator';
    import Page from '../components/page/Page.svelte';
    import SetNewPasswordForm from '../components/form/SetNewPasswordForm.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('setNewPassword.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('setNewPassword.title')}">
    <div class="text-end mt-auto">
        <p>
            <Link to="/login">{$t('login.title')}</Link>
        </p>
    </div>

    <SetNewPasswordForm/>
</Page>
