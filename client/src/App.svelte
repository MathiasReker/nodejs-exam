<script>
    import Login from "./pages/Login.svelte";
    import {navigate, Route, Router} from "svelte-navigator";
    import SignUp from "./pages/SignUp.svelte";
    import ForgotPassword from "./pages/ForgotPassword.svelte";
    import Nav from "./components/Layout/Nav.svelte";
    import Footer from "./components/Layout/Footer.svelte";
    import MyCollection from "./pages/Profile.svelte";
    import Home from "./pages/Home2.svelte";
    import {user} from "./stores.js";
    import About from "./pages/About.svelte";
    import Settings from "./pages/Settings.svelte";
    import {SvelteToast} from '@zerodevx/svelte-toast'

    $: if (!$user) {
        navigate("/login", {
            replace: true,
        });
    }

</script>

<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <Nav/>
    <Router>
        <Route path="/about">
            <About/>
        </Route>
        {#if $user}
            <Route path="/">
                <Home/>
            </Route>
            <Route path="/profile">
                <MyCollection/>
            </Route>
            <Route path="/settings">
                <Settings/>
            </Route>
        {:else}
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/signup">
                <SignUp/>
            </Route>
            <Route path="/forgot-password">
                <ForgotPassword/>
            </Route>
        {/if}
    </Router>
    <Footer/>

    <SvelteToast/>
</div>

<!-- https://github.com/sveltejs/prettier-plugin-svelte -->