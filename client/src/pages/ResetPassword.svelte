<script>
    import { Link } from 'svelte-navigator';
    import ResetPasswordForm from '../components/Form/ResetPasswordForm.svelte';
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('resetPassword.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('resetPassword.title')}">
    <div class="row">
        <div class="col">
            <h1 class="mb-3">
                {$t('resetPassword.title')}
            </h1>
        </div>
        <div class="col text-end mt-auto">
            <p>
                <Link to="/login">{$t('resetPassword.backToLogin')}</Link>
            </p>
        </div>
    </div>

    <ResetPasswordForm/>
</Page>
