<script>
    import { navigate } from 'svelte-navigator';
    import { user } from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import Pagination from '../components/Pagination.svelte';

    if (location.pathname !== '/reset-password') {
      if (!$user) {
        navigate('/signin', {
          replace: true,
        });
      }
    }
</script>

<Nav/>

<main>
    <Pagination page="Page not found"/>

    <h1>Page not found</h1>
    <p>This page does not exists</p>
</main>
