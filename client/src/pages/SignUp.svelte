<script>
    import { Link } from 'svelte-navigator';
    import SignUpForm from '../components/Form/SignUpForm.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';
    import Lang from '../components/Lang.svelte';

    const items = [
      { href: '/', text: 'Home' },
      { href: '/sign-up', text: 'Sign up' },
    ];
</script>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <h1 class="mb-3"><Lang page="signIn" trans="title"></Lang></h1>

    <SignUpForm/>

    <div class="mt-2 text-center">
        <p>
            Already have an account?
            <Link to="/signin">Sign in</Link>
        </p>
    </div>
</main>
