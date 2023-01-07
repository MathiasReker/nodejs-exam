<script>
    import { user } from '../js/stores';
    import Lang from './Util/Lang.svelte';

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
          // statistics: $user.statistics.lookups, // TODO
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
    <Lang page="settings" trans="exportAccountDataBtn"></Lang>
</a>
