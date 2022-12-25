<script>
    import { navigate } from 'svelte-navigator';
    import { lang, user } from '../js/stores';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Layout/Breadcrumbs.svelte';
    import Head from './Head.svelte';
    import { languages } from '../js/language';
    import Lang from '../components/Util/Lang.svelte';

    if (location.pathname !== '/reset-password') {
      if (!$user) {
        navigate('/signin', {
          replace: true,
        });
      }
    }

    const items = [
      { href: '/', text: languages.global.home[$lang] },
      { href: '/page-not-found', text: languages.pageNotFound.title[$lang] },
    ];
</script>

<Head title="Page not found"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <h1>
        <Lang page="pageNotFound" trans="title"></Lang>
    </h1>
    <p>
        <Lang page="pageNotFound" trans="deck"></Lang>
    </p>
</main>
