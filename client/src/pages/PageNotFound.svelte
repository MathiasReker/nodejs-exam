<script>
    import { lang } from '../js/stores';
    import languages from '../js/language';
    import Lang from '../components/Util/Lang.svelte';
    import Page from './Page.svelte';

    const title = languages.pageNotFound.title[$lang];

    const pagination = [
      { href: '/', text: languages.global.home[$lang] },
      { href: location.pathname, text: title },
    ];
</script>

<Page pagination="{pagination}" title="{title}">
    <h1>
        <Lang page="pageNotFound" trans="title"></Lang>
    </h1>
    <p>
        <Lang page="pageNotFound" trans="deck"></Lang>
    </p>
</Page>
