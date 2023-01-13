<script>
    import { Link } from 'svelte-navigator';
    import LoginForm from '../components/Form/LoginForm.svelte';
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('login.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('login.title')}">
    <div class="row">
        <div class="col">
            <h1 class="mb-3">
                {$t('login.title')}
            </h1>
        </div>
        <div class="col text-end mt-auto">
            <p>
                <Link to="/signup">{$t('login.noAccount')}</Link>
            </p>
        </div>
    </div>

    <LoginForm/>

    <div class="mt-2 text-center">
        <p>
            <Link to="/reset-password">{$t('login.forgotPassword')}</Link>
        </p>
    </div>
</Page>
