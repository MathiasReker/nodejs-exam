<script>
    import languages from '../js/language';
    import { lang } from '../js/stores';
    import Page from './Page.svelte';

    const title = languages.help.title[$lang];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: window.location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <h1>
        About..
    </h1>
    <p>
        This is another project ...
    </p>
</Page>
