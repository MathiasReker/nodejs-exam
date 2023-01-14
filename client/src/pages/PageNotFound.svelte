<script>
    import Page from '../components/page/Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.title') },
      { href: window.location.pathname, text: $t('pageNotFound.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" description="{$t('pageNotFound.description')}" title="{$t('pageNotFound.title')}">

</Page>
