<script>
    import { Link } from 'svelte-navigator';
    import Nav from '../components/Layout/Nav.svelte';
    import SignInForm from '../components/Form/SignInForm.svelte';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';
    import Lang from '../components/Lang.svelte';
    import Head from "./Head.svelte";

    const items = [
      { href: '/', text: 'Home' },
      { href: '/sign-in', text: 'Sign in' },
    ];
</script>

<Head title="Sing in"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <h1 class="mb-3">
        <Lang page="signIn" trans="title"></Lang>
    </h1>

    <SignInForm/>

    <div class="mt-2 text-center">
        <p> Don't have an account yet?
            <Link to="/signup">Sign up</Link>
        </p>
        <p>
            <Link to="/forgot-password">Forgot password?</Link>
        </p>
    </div>
</main>
