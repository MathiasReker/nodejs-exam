<script>
    import {user} from "../stores.js";
    import {navigate} from "svelte-navigator";
    import Nav from "../components/Layout/Nav.svelte";
    import Pagination from "../components/Pagenation.svelte";

    if (location.pathname !== "/reset-password") {
        $: if (!$user) {
            navigate("/login", {
                replace: true,
            });
        }
    }
</script>

<Nav/>

<main>
    <Pagination page="Page not found"/>
    <h1>Page not found</h1>
    <p>This page does not exsists</p>
</main>