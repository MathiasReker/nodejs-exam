<script>
    import languages from '../js/language';
    import { user } from '../js/stores.js';

    export let title;

    export let metaTitle;

    export let metaDescription;
</script>

<svelte:head>
    <title>{title ?? languages.head.title[$user.settings.language]}</title>
    <meta content="{metaTitle ?? languages.head.title[$user.settings.language]}" name="title"/>
    <meta content="{metaDescription ?? ''}" name="description"/>
    <link href="{location.href}" rel="canonical"/>
</svelte:head>
