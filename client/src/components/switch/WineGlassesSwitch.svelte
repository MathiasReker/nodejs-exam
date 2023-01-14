<script>
    import { user } from '../../js/user.js';
    import { displayError, displaySuccess } from '../../js/toast.js';
    import { request } from '../../js/fetch-wrapper.js';
    import Switch from './Switch.svelte';
    import { t } from '../../js/localization.js';

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
        displaySuccess($t('settings.settingsSaved'));
      } catch (err) {
        displayError($t('global.error'));
      }
    };
</script>

<Switch checked="{bindGroup.includes(value)}"
        onChange="{onChange}"
        value="{value}">
</Switch>
