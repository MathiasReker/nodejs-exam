<script>
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('about.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('about.title')}" description="{$t('settings.description')}">

</Page>
