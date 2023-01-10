<script>
    import { request } from '../js/fetchWrapper';
    import { lang, user } from '../js/stores';
    import { displayError, displaySuccess } from '../js/toast';

    let language = $lang;

    const languages = [
      {
        iso: 'en',
        img: '🇬🇧',
        language: 'English',
      },
      {
        iso: 'da',
        img: '🇩🇰',
        language: 'Danish',
      },
    ];

    const handleUpdateLanguage = async () => {
      try {
        const updateLanguageFetch = await request(`/api/users/${$user.uuid}/settings/language`, {
          method: 'PUT',
          body: {
            language,
          },
        });

        $lang = updateLanguageFetch.data.language;

        $user.settings.language = updateLanguageFetch.data.language;
        localStorage.setItem('user', JSON.stringify($user));

        displaySuccess('Language updated!');
      } catch (err) {
        displayError(err);
      }
    };
</script>

<div>
    <select
            bind:value={language}
            class="form-select"
            on:change={handleUpdateLanguage}
            style="max-width: 200px">
        {#each languages as language}
            <option value="{language.iso}">{`${language.img} ${language.language}`}</option>
        {/each}
    </select>
</div>
