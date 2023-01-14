<script>
    import { Link } from 'svelte-navigator';
    import SignUpForm from '../components/Form/SignUpForm.svelte';
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('signUp.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('signUp.title')}">

    <div class="col text-end mt-auto">
        <p>
            <Link to="/login">{$t('signUp.haveAccount')}</Link>
        </p>
    </div>

    <SignUpForm/>
</Page>
