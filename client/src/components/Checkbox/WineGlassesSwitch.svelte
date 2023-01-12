<script>
    import { user } from '../../js/stores';
    import { displayError, displaySuccess } from '../../js/toast';
    import { request } from '../../js/fetchWrapper';
    import Switch from '../Switch.svelte';

    export let bindGroup = [];
    export let value = '';

    const onChange = async ({ target }) => {
      // eslint-disable-next-line no-shadow
      const { value, checked } = target;
      if (checked) {
        bindGroup = [...bindGroup, value];
      } else {
        bindGroup = bindGroup.filter((item) => item !== value);
      }

      try {
        const wineGlassesFetch = await request('/api/users/me/wine-glasses', {
          method: 'PUT',
          body: {
            wineGlasses: bindGroup,
          },
        });

        $user.settings.wineGlasses = wineGlassesFetch.data.wineGlasses;
        localStorage.setItem('user', JSON.stringify($user));
        displaySuccess('Settings saved!');
      } catch (err) {
        displayError(err);
      }
    };
</script>

<Switch checked="{bindGroup.includes(value)}"
        onChange="{onChange}"
        value="{value}">
</Switch>
