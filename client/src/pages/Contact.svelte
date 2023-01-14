<script>
    import ContactForm from '../components/form/ContactForm.svelte';
    import Page from '../components/page/Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('contact.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('contact.title')}">
    <ContactForm/>
</Page>
