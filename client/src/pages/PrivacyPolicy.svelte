<script>
    import languages from '../js/language';
    import {lang} from '../js/stores';
    import Page from './Page.svelte';
    import PrivacyPolicyDiv from "../components/PrivacyPolicyDiv.svelte";

    const title = 'Privacy Policy';

    const breadcrumbs = [
        {href: '/', text: languages.global.home[$lang]},
        {href: location.pathname, text: title},
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <PrivacyPolicyDiv/>
</Page>
