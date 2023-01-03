<script>
    import { Link } from 'svelte-navigator';
    import SignInForm from '../components/Form/SignInForm.svelte';
    import Lang from '../components/Util/Lang.svelte';
    import Page from './Page.svelte';
    import language from '../js/language';
    import { lang } from '../js/stores';

    const title = language.signIn.title[$lang];

    const breadcrumbs = [
      { href: '/', text: language.global.home[$lang] },
      { href: location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <div class="row">
        <div class="col">
            <h1 class="mb-3">
                <Lang page="signIn" trans="title"></Lang>
            </h1>
        </div>
        <div class="col text-end mt-auto">
            <p>
                <Link to="/signup">I don't have an account</Link>
            </p>
        </div>
    </div>

    <SignInForm/>

    <div class="mt-2 text-center">
        <p>
            <Link to="/reset-password">Can't sign in?</Link>
        </p>
    </div>
</Page>
