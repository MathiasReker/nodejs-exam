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

    const handleUpdateLanguage = () => {
      request(`/api/users/${$user.email}/settings/language`, {
        method: 'PUT',
        body: {
          language,
        },
      })
        .then((res) => {
          $lang = res.data.language;

          $user.settings.language = res.data.language;
          localStorage.setItem('user', JSON.stringify($user));

          displaySuccess('todo!');
        })
        .catch(() => {
          displayError('Something went wrong...');
        });
    };
</script>

<div>
    <select bind:value={language} class="form-select" on:change={handleUpdateLanguage}>
        {#each languages as language}
            <option value="{language.iso}">{`${language.img} ${language.language}`}</option>
        {/each}
    </select>
</div>
