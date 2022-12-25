<script>
    import languages from '../js/language';
    import { lang } from '../js/stores';

    export let title;
    export let metaTitle;
    export let metaDescription;
</script>

<svelte:head>
    <title>{title ?? languages.head.title[$lang]}</title>
    <meta content="{metaTitle ?? languages.head.title[$lang]}" name="title"/>
    <meta content="{metaDescription ?? ''}" name="description"/>
    <link href="{location.href}" rel="canonical"/>
</svelte:head>
