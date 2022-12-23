<script>
    import {languages} from '../js/language.js';
    import {lang} from '../js/stores.js';

    export let title;
    export let metaTitle;
    export let metaDescription;
</script>

<svelte:head>
    <title>{title ?? languages.head.title[$lang]}</title>
    <meta content="{metaTitle ?? languages.head.title[$lang]}" name="title"/>
    <meta content="{metaDescription ?? ''}" name="description"/>
</svelte:head>
