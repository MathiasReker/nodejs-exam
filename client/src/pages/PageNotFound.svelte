<script>
    import { navigate } from 'svelte-navigator';
    import { user } from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';

    if (location.pathname !== '/reset-password') {
      if (!$user) {
        navigate('/signin', {
          replace: true,
        });
      }
    }

    const items = [
      { href: '/', text: 'Home' },
      { href: '/page-not-found', text: 'Page not found' },
    ];
</script>

<Nav/>

<main class="px-3">
    <Breadcrumbs page="Page not found"/>

    <h1>Page not found</h1>
    <p>This page does not exists</p>
</main>
