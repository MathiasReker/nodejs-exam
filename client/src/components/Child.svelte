<script>
    import { request } from '../js/fetchWrapper';
    import { user } from '../js/stores';
    import { displayError, displaySuccess } from '../js/toast';
    import { lang } from '../js/stores'

    export let { language } = $user.settings;

    const languages = [
      'da',
      'en',
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

          localStorage.setItem('user', JSON.stringify($user));

          displaySuccess('todo!');
        })
        .catch(() => {
          displayError('Something went wrong...');
        });
    };

</script>

<p>
    <select bind:value={language} class="form-select" on:change={handleUpdateLanguage}>
        {#each languages as language}
            <option>{language}</option>
        {/each}
    </select>
</p>
