<script>
    import { Link } from 'svelte-navigator';
    import ForgotPasswordForm from '../components/Form/ForgotPasswordForm.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';
    import Lang from '../components/Lang.svelte';
    import Head from './Head.svelte';
    import { languages } from '../js/language';
    import { lang } from '../js/stores';

    const items = [
      { href: '/', text: languages.global.home[$lang] },
      { href: '/forgot-password', text: languages.forgotPassword.title[$lang] },
    ];
</script>

<Head title="Forgot password"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <h1>
        <Lang page="forgotPassword" trans="title"></Lang>
    </h1>
    <p class="lead">
        <Lang page="forgotPassword" trans="deck"></Lang>
    </p>

    <ForgotPasswordForm/>

    <div class="mt-2 text-center">
        <p>
            <Link to="/signin">Sign in</Link>
        </p>
    </div>
</main>
