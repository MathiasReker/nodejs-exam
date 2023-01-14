<script>
    import { locale, locales, t } from '../../js/localization.js';
    import { user } from '../../js/user.js';
    import { request } from '../../js/fetch-wrapper.js';
    import { displayError, displaySuccess } from '../../js/toast.js';

    const handleUpdateLanguage = async () => {
      try {
        const updateLanguageFetch = await request('/api/users/me/settings/language', {
          method: 'PUT',
          body: {
            language: $locale,
          },
        });

        $locale = updateLanguageFetch.data.language;

        $user.settings.language = updateLanguageFetch.data.language;

        localStorage.setItem('user', JSON.stringify($user));

        displaySuccess($t('settings.languageUpdatedSuccessfully'));
      } catch (err) {
        displayError($t('global.error'));
      }
    };
</script>

<div>
    <select
            bind:value={$locale}
            class="form-select"
            on:change={handleUpdateLanguage}
            style="max-width: 200px">
        {#each locales as l}
            <option value="{l.iso}">{`${l.img} ${l.language}`}</option>
        {/each}
    </select>
</div>
