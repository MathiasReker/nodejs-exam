<script>
    import { Link } from 'svelte-navigator';
    import SignUpForm from '../components/Form/SignUpForm.svelte';
    import Lang from '../components/Util/Lang.svelte';
    import languages from '../js/language';
    import { lang } from '../js/stores';
    import Page from './Page.svelte';

    const title = languages.signUp.title[$lang];

    const pagination = [
      { href: '/', text: languages.global.home[$lang] },
      { href: location.pathname, text: title },
    ];
</script>

<Page pagination="{pagination}" title="{title}">
    <h1 class="mb-3">
        <Lang page="signIn" trans="title"></Lang>
    </h1>

    <SignUpForm/>

    <div class="mt-2 text-center">
        <p>
            Already have an account?
            <Link to="/signin">Sign in</Link> <!-- TODO --->
        </p>
    </div>
</Page>
