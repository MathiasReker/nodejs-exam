<script>
    import { Link } from 'svelte-navigator';
    import SignUpForm from '../components/Form/SignUpForm.svelte';
    import languages from '../js/language';
    import Page from './Page.svelte';
    import { lang } from '../js/stores';

    const title = languages.signUp.title[$lang];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: window.location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <div class="row">
        <div class="col">
            <h1 class="mb-3">
                Sign up <!-- TODO -->
            </h1>
        </div>
        <div class="col text-end mt-auto">
            <p>
                <Link to="/signin">I have an account</Link>
            </p>
        </div>
    </div>

    <SignUpForm/>
</Page>
