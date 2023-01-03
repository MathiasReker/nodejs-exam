<script>
    import { Link } from 'svelte-navigator';
    import SignInForm from '../components/Form/SignInForm.svelte';
    import Lang from '../components/Util/Lang.svelte';
    import Page from './Page.svelte';
    import language from '../js/language';
    import { user } from '../js/stores.js';

    const title = language.signIn.title[$user.settings.language];

    const breadcrumbs = [
      { href: '/', text: language.global.home[$user.settings.language] },
      { href: location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <h1 class="mb-3">
        <Lang page="signIn" trans="title"></Lang>
    </h1>

    <SignInForm/>

    <div class="mt-2 text-center">
        <p> Don't have an account yet? <!-- TODO -->
            <Link to="/signup">Sign up</Link>
        </p>
        <p>
            <Link to="/forgot-password">Forgot password?</Link> <!-- TODO -->
        </p>
    </div>
</Page>
