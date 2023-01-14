<script>
    import Page from '../components/page/Page.svelte';
    import PrivacyPolicyDiv from '../components/div/PrivacyPolicyDiv.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('privacyPolicy.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('privacyPolicy.title')}">
    <PrivacyPolicyDiv/>
</Page>
