<script>
    import { Link } from 'svelte-navigator';
    import SignUpForm from '../components/Form/SignUpForm.svelte';
    import Pagination from '../components/Pagination.svelte';
    import Nav from '../components/Layout/Nav.svelte';
</script>

<Nav/>

<main class="px-3">
    <Pagination page="Signup"/>

    <h1 class="mb-5">Sign up</h1>

    <SignUpForm/>

    <div class="mt-2 text-center">
        <p>
            Already have an account?
            <Link to="/login">Sign in</Link>
        </p>
    </div>
</main>
