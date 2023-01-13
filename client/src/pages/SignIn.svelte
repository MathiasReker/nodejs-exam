<script>
    import { Link } from 'svelte-navigator';
    import SignInForm from '../components/Form/SignInForm.svelte';
    import Page from './Page.svelte';
    import { t } from '../js/localization.js';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('signIn.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('signIn.title')}">
    <div class="row">
        <div class="col">
            <h1 class="mb-3">
                {$t('signIn.title')}
            </h1>
        </div>
        <div class="col text-end mt-auto">
            <p>
                <Link to="/signup">{$t('signIn.noAccount')}</Link>
            </p>
        </div>
    </div>

    <SignInForm/>

    <div class="mt-2 text-center">
        <p>
            <Link to="/reset-password">{$t('signIn.forgotPassword')}</Link>
        </p>
    </div>
</Page>
