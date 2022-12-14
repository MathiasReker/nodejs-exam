<script>
    import {Link} from "svelte-navigator";
    import SignUpForm from "../components/Form/SignUpForm.svelte";
</script>

<main class="w-100">
    <h1 class="mb-5">Sign up</h1>

    <SignUpForm/>

    <div class="mt-2 text-center">
        Already have an account? <Link to="/login">Sign in</Link>
    </div>
</main>