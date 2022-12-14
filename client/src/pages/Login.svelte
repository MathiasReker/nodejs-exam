<script>
    import {Link} from "svelte-navigator";
    import LoginForm from "../components/Form/LoginForm.svelte";
</script>

<main class="w-100">
    <h1 class="mb-5">Login</h1>

    <LoginForm/>

    <div class="mt-2 text-center">
        Don't have an account yet?
        <Link to="/signup">Sign up</Link><br>
        <Link to="/forgot-password">Forgot password?</Link>
    </div>
</main>
