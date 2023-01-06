<script>
    import { Link } from 'svelte-navigator';
    import ResetPasswordForm from '../components/Form/ResetPasswordForm.svelte';
    import languages from '../js/language';
    import { lang } from '../js/stores';
    import Page from './Page.svelte';

    const title = languages.resatPassword.title[$lang];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: window.location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <div class="row">
        <div class="col">
            <h1 class="mb-3">
                Reset password <!-- TODO -->
            </h1>
        </div>
        <div class="col text-end mt-auto">
            <p>
                <Link to="/signin">Back to sign-in</Link>
            </p>
        </div>
    </div>

    <ResetPasswordForm/>
</Page>
