<script>
    import { Link } from 'svelte-navigator';
    import ForgotPasswordForm from '../components/Form/ForgotPasswordForm.svelte';
    import Lang from '../components/Util/Lang.svelte';
    import languages from '../js/language';
    import { lang, user } from '../js/stores';
    import Page from './Page.svelte';

    const title = languages.forgotPassword.title[$lang];
    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <h1>
        <Lang page="forgotPassword" trans="title"></Lang>
    </h1>

    <p class="lead">
        <Lang page="forgotPassword" trans="deck"></Lang>
    </p>

    <ForgotPasswordForm/>

    <div class="mt-2 text-center">
        <p>
            <Link to="/signin">Sign in</Link> <!-- TODO  translate -->
        </p>
    </div>
</Page>
