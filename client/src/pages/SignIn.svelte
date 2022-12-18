<script>
    import { Link } from 'svelte-navigator';
    import Pagination from '../components/Pagination.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import SignInForm from '../components/Form/SignInForm.svelte';
</script>

<Nav/>

<main class="px-3">
    <Pagination page="Help"/>

    <h1 class="mb-5">sign in</h1>

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
