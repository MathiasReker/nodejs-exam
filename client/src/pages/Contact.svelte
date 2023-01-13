<script>
    import ContactForm from '../components/Form/ContactForm.svelte';
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('contact.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('contact.title')}">
    <h1>
        {$t('contact.title')}
    </h1>

    <ContactForm/>
</Page>
