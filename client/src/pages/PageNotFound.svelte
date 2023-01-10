<script>
    import { lang } from '../js/stores';
    import languages from '../js/language';
    import Lang from '../components/Util/Lang.svelte';
    import Page from './Page.svelte';
    import handleAuthNavigator from '../js/handleAuthNavigator';

    handleAuthNavigator();

    const title = languages.pageNotFound.title[$lang];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: window.location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <h1>
        <Lang page="pageNotFound" trans="title"></Lang>
    </h1>
    <p>
        <Lang page="pageNotFound" trans="deck"></Lang>
    </p>
</Page>
