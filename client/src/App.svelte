<script>
    import { Route, Router } from 'svelte-navigator';
    import { SvelteToast } from '@zerodevx/svelte-toast';
    import io from 'socket.io-client';
    import SignUp from './pages/SignUp.svelte';
    import Footer from './components/layout/Footer.svelte';
    import WineGlasses from './pages/WineGlasses.svelte';
    import Home from './pages/Home.svelte';
    import Contact from './pages/Contact.svelte';
    import Settings from './pages/Settings.svelte';
    import ResetPassword from './pages/ResetPassword.svelte';
    import Profile from './pages/Profile.svelte';
    import PageNotFound from './pages/PageNotFound.svelte';
    import Login from './pages/Login.svelte';
    import { displayInfo } from './js/toast';
    import SetNewPassword from './pages/SetNewPassword.svelte';
    import About from './pages/About.svelte';
    import PrivacyPolicy from './pages/PrivacyPolicy.svelte';
    import CookieConsent from './components/switch/CookieSwitch.svelte';
    import PrivateRoute from './components/layout/security/PrivateRoute.svelte';

    io.connect(import.meta.env.VITE_API_BASE_URL).on('message:create', (res) => {
      displayInfo(res.data);
    });
</script>

<div class="cover-container d-flex w-100 h-100 mx-auto flex-column">
    <Router>
        <PrivateRoute path="/">
            <Home/>
        </PrivateRoute>
        <PrivateRoute path="/wine-glasses">
            <WineGlasses/>
        </PrivateRoute>
        <PrivateRoute path="/settings">
            <Settings/>
        </PrivateRoute>
        <PrivateRoute path="/profile">
            <Profile/>
        </PrivateRoute>
        <Route path="/contact">
            <Contact/>
        </Route>
        <Route path="/about">
            <About/>
        </Route>
        <Route path="/privacy-policy">
            <PrivacyPolicy/>
        </Route>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/signup">
            <SignUp/>
        </Route>
        <Route path="/reset-password">
            <ResetPassword/>
        </Route>
        <Route path="/set-new-password">
            <SetNewPassword/>
        </Route>
        <Route component="{PageNotFound}"></Route>
    </Router>
    <Footer/>
    <SvelteToast/>
</div>
<CookieConsent/>
