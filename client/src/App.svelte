<script>
    import { navigate, Route, Router } from 'svelte-navigator';
    import { SvelteToast } from '@zerodevx/svelte-toast';
    import SignUp from './pages/SignUp.svelte';
    import ForgotPassword from './pages/ForgotPassword.svelte';
    import Footer from './components/Layout/Footer.svelte';
    import WineGlasses from './pages/WineGlasses.svelte';
    import Home from './pages/Home.svelte';
    import { user } from './js/stores';
    import About from './pages/Help.svelte';
    import Settings from './pages/Settings.svelte';
    import ResetPassword from './pages/ResetPassword.svelte';
    import Profile from './pages/Profile.svelte';
    import PageNotFound from './pages/PageNotFound.svelte';
    import Signin from './pages/SignIn.svelte';
    import io from "socket.io-client";
    import {displaySuccess} from "./js/toast.js";

    if (location.pathname !== '/reset-password') {
      if (!$user) {
        navigate('/signin', {
          replace: true,
        });
      }
    }

    // TODO move to component..
    const socket = io.connect("http://127.0.0.1:3000");

    socket.on("foo", (data) => {
        displaySuccess(data.data)
    });

</script>


<div class="cover-container d-flex w-100 h-100 mx-auto flex-column">
    <Router>
        <Route path="/about">
            <About/>
        </Route>
        {#if $user}
            <Route path="/">
                <Home/>
            </Route>
            <Route path="/wine-glasses">
                <WineGlasses/>
            </Route>
            <Route path="/settings">
                <Settings/>
            </Route>
            <Route path="/profile">
                <Profile/>
            </Route>
        {:else}
            <Route path="/signin">
                <Signin/>
            </Route>
            <Route path="/signup">
                <SignUp/>
            </Route>
            <Route path="/forgot-password">
                <ForgotPassword/>
            </Route>
            <Route path="/reset-password">
                <ResetPassword/>
            </Route>
        {/if}
        <Route component="{PageNotFound}"></Route>
    </Router>
    <Footer/>

    <SvelteToast/>

</div>

<!-- https://github.com/sveltejs/prettier-plugin-svelte -->
