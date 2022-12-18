<script>
    import { Link } from 'svelte-navigator';
    import LoginForm from '../components/Form/LoginForm.svelte';
    import Pagenation from '../components/Pagination.svelte';
    import Nav from '../components/Layout/Nav.svelte';
</script>

<Nav/>

<main class="px-3">
    <Pagenation page="Help"/>

    <h1 class="mb-5">Login</h1>

    <LoginForm/>

    <div class="mt-2 text-center">
        <p> Don't have an account yet?
            <Link to="/signup">Sign up</Link>
        </p>
        <p>
            <Link to="/forgot-password">Forgot password?</Link>
        </p>
    </div>
</main>
