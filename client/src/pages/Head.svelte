<script>
    import languages from '../js/language';
    import { lang, apiBaseUrl } from '../js/stores';

    export let title;

    export let metaTitle;

    export let metaDescription;
</script>

<svelte:head>
    <title>{title ?? languages.head.title[$lang]}</title> <!-- TODO -->
    <meta content="{metaTitle ?? languages.head.title[$lang]}" name="title"/>
    <meta content="{metaDescription ?? ''}" name="description"/>
    <link href="{window.location.href}" rel="canonical"/>
    <link crossorigin="anonymous" href="{apiBaseUrl}" rel="preconnect">
</svelte:head>
