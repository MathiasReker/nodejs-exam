<script>
    import { Link } from 'svelte-navigator';
    import languages from '../js/language';
    import { lang } from '../js/stores';
    import Page from './Page.svelte';
    import SetNewPasswordForm from '../components/Form/SetNewPasswordForm.svelte';

    const title = languages.passwordReset.title[$lang];
    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <div class="row">
        <div class="col">
            <h1 class="mb-3">
                Set new password
            </h1>
        </div>
        <div class="col text-end mt-auto">
            <p>
                <Link to="/signin">Sign in</Link>
            </p>
        </div>
    </div>

    <SetNewPasswordForm/>
</Page>
