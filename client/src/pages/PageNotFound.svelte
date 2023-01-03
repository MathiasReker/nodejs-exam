<script>
    import { user } from '../js/stores';
    import languages from '../js/language';
    import Lang from '../components/Util/Lang.svelte';
    import Page from './Page.svelte';
    import authNavigator from '../js/authNavigator';

    authNavigator();

    const title = languages.pageNotFound.title[$user.settings.language];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$user.settings.language] },
      { href: location.pathname, text: title },
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
