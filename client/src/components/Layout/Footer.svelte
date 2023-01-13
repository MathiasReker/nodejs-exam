<script>
    import { link } from 'svelte-navigator';
    import { t } from '../../js/localization';

    const currentYear = new Date().getFullYear();
</script>

<footer class="text-muted mt-auto text-center pt-5">
    <p>© {currentYear}
        {$t('global.title')}
        | <a href="/privacy-policy" use:link>
            {$t('privacyPolicy.title')}
        </a>
    </p>
</footer>
