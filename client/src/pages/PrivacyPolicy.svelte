<script>
    import Page from './Page.svelte';
    import PrivacyPolicyDiv from '../components/PrivacyPolicyDiv.svelte';
    import { t } from '../js/localization';

    const breadcrumbs = [
      { href: '/', text: $t('global.home') },
      { href: window.location.pathname, text: $t('privacyPolicy.title') },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{$t('privacyPolicy.title')}">
    <PrivacyPolicyDiv/>
</Page>
