<script>
    import {Link} from "svelte-navigator";
    import SignUpForm from "../components/Form/SignUpForm.svelte";
    import Pagenation from "../components/Pagenation.svelte";
    import Nav from "../components/Layout/Nav.svelte";
</script>

<Nav/>

<main class="px-3">
    <Pagenation page="Signup"/>

    <h1 class="mb-5">Sign up</h1>

    <SignUpForm/>

    <div class="mt-2 text-center">
        Already have an account? <Link to="/login">Sign in</Link>
    </div>
</main>