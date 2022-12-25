<script>
    import { Link } from 'svelte-navigator';
    import SignUpForm from '../components/Form/SignUpForm.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Layout/Breadcrumbs.svelte';
    import Lang from '../components/Util/Lang.svelte';
    import Head from './Head.svelte';
    import { languages } from '../js/language';
    import { lang } from '../js/stores';

    const items = [
      { href: '/', text: languages.global.home[$lang] },
      { href: '/sign-up', text: languages.signUp.title[$lang] },
    ];
</script>

<Head title="Sign up"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <h1 class="mb-3">
        <Lang page="signIn" trans="title"></Lang>
    </h1>

    <SignUpForm/>

    <div class="mt-2 text-center">
        <p>
            Already have an account?
            <Link to="/signin">Sign in</Link>
        </p>
    </div>
</main>
