<script>
    import Page from './Page.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('about.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('about.title')}">
    <h1>
        {$t('about.title')}
    </h1>
    <p>
        {$t('settings.description')}
    </p>
</Page>
