<script>
    import { user } from '../js/stores.js';
    import Lang from './Util/Lang.svelte';

    const jsonToCsv = (arr) => {
      const array = [Object.keys(arr[0])].concat(arr);
// TODO refactor
      return array.map((it) => Object.values(it).join(';')).join('\n');
    };

    // TODO: Add statistics..
    const csvContent = (
      jsonToCsv(
        [
          {
            username: $user.name,
            email: $user.email,
            language: $user.settings.language,
            wineGlasses: $user.settings.wineGlasses.join(','),
          },
        ],
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
