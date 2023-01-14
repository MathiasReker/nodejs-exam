<script>
    import Page from '../components/page/Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('about.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('about.title')}" description="{$t('about.description')}">

</Page>
