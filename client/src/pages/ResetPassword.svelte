<script>
    import { Link } from 'svelte-navigator';
    import ResetPasswordForm from '../components/form/ResetPasswordForm.svelte';
    import Page from '../components/page/Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('resetPassword.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('resetPassword.title')}">

    <div class="text-end mt-auto">
        <p>
            <Link to="/login">{$t('resetPassword.backToLogin')}</Link>
        </p>
    </div>

    <ResetPasswordForm/>
</Page>
