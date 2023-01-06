<script>
    import ContactForm from '../components/Form/ContactForm.svelte';
    import Lang from '../components/Util/Lang.svelte';
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
        <Lang page="help" trans="title"></Lang>
    </h1>

    <ContactForm/>
</Page>
