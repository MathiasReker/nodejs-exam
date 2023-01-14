<script>
    import { user } from '../../js/user.js';
    import { t } from '../../js/localization.js';

    const jsonToCsv = (data) => {
      const array = [Object.keys(data)].concat(data);

      return array.map((value) => Object.values(value).join(';')).join('\n');
    };

    const csvContent = (
      jsonToCsv(
        {
          username: $user.name,
          email: $user.email,
          language: $user.settings.language,
          wineGlasses: $user.settings.wineGlasses.join(','),
          grapeLookups: $user.statistics.lookups,
        },
      )
    );

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
    const objUrl = URL.createObjectURL(blob);
</script>

<a
        class="btn btn-secondary"
        download="wine_glass_guide.csv"
        href="{objUrl}"
        type="button">
    {$t('settings.exportToCsvBtn')}
</a>
