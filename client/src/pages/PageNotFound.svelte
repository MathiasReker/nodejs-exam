<script>
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.title') },
      { href: window.location.pathname, text: $t('pageNotFound.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('pageNotFound.title')}">
    <h1>
        {$t('pageNotFound.title')}
    </h1>
    <p>
        {$t('pageNotFound.description')}
    </p>
</Page>
