<script>
    import { Link } from 'svelte-navigator';
    import Page from './Page.svelte';
    import SetNewPasswordForm from '../components/Form/SetNewPasswordForm.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('setNewPassword.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('setNewPassword.title')}">
    <div class="row">
        <div class="col">
            <h1 class="mb-3">
                {$t('setNewPassword.title')}
            </h1>
        </div>
        <div class="col text-end mt-auto">
            <p>
                <Link to="/signin">{$t('signIn.title')}</Link>
            </p>
        </div>
    </div>

    <SetNewPasswordForm/>
</Page>
