<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { displayError, displaySuccess } from '../../js/toast';
    import { request } from '../../js/fetch-wrapper';
    import { t } from '../../js/localization';

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');

    let password = '';
    let passwordInput = null;
    let loading = false;

    onMount(() => {
      passwordInput.focus();
    });
    const handleOnSubmit = async () => {
      loading = true;

      try {
        await request('/api/auth/reset', {
          method: 'PUT',
          body: {
            email,
            password,
            token,
          },
        });
        displaySuccess($t('setNewPassword.successfullyResat'));
        navigate('/login');
      } catch (err) {
        displayError($t('global.error'));
      } finally {
        loading = false;
      }
    };
</script>

<main class="form-login w-100 m-auto">
    {#if email && token}
        <form on:submit|preventDefault={handleOnSubmit}>
            <div class="form-floating mb-3">
                <input value={email} class="form-control" id="email"
                       placeholder="demo@demo.com" required disabled type="email">
                <label for="email">{$t('global.emailAddress')}</label>
            </div>
            <div class="form-floating mb-3">
                <input bind:this={passwordInput} bind:value={password} class="form-control" id="password"
                       placeholder="Password" required
                       type="password">
                <label for="password">{$t('global.password')}</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" disabled="{loading}"
                    type="submit">{$t('setNewPassword.submit')}</button>
        </form>
    {/if}
</main>
