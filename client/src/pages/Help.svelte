<script>
    import ContactForm from '../components/Form/ContactForm.svelte';
    import Lang from '../components/Util/Lang.svelte';
    import languages from '../js/language';
    import { user } from '../js/stores';
    import Page from './Page.svelte';

    const title = languages.help.title[$user.settings.language];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$user.settings.language] },
      { href: location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <h1>
        <Lang page="help" trans="title"></Lang>
    </h1>

    <p class="lead">
        <Lang page="help" trans="deck"></Lang>
    </p>

    <ContactForm/>
</Page>
