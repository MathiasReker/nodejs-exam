<script>
    import Page from '../components/page/Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('about.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" description="{$t('about.description')}" title="{$t('about.title')}">

</Page>
