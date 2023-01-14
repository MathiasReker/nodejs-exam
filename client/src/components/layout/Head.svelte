<script>
    import { t } from '../../js/localization';

    export let title;
    export let metaTitle = $t('global.title');
    export let metaDescription = '';
</script>

<svelte:head>
    <title>{title ?? $t('global.title')}</title>
    <meta content="{metaTitle}" name="title"/>
    <meta content="{metaDescription}" name="description"/>
    <link href="{window.location.href}" rel="canonical"/>
</svelte:head>
