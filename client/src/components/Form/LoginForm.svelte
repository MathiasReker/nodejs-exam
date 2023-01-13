<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { displayError } from '../../js/toast';
    import { request } from '../../js/fetch-wrapper';
    import { user } from '../../js/stores';
    import { t } from '../../js/localization';

    let email = '';
    let emailInput = null;
    let password = '';
    let loading = false;

    onMount(() => {
      emailInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      const userLogin = { email, password };

      try {
        const fetchAuthLogin = await request('/api/auth/login', {
          method: 'POST',
          body: userLogin,
        });

        if (fetchAuthLogin.data) {
          try {
            $user = fetchAuthLogin.data;
            localStorage.setItem('user', JSON.stringify($user));
            navigate('/');
          } catch (err) {
            displayError(err);
          } finally {
            loading = false;
          }
        }
      } catch (err) {
        displayError(err);
      }
    };
</script>

<main class="w-100 m-auto">
    <form on:submit|preventDefault={handleOnSubmit}>
        <div class="form-floating mb-3">
            <input bind:this={emailInput} bind:value={email} class="form-control" id="email"
                   placeholder="demo@demo.com" required type="email">
            <label for="email">{$t('global.emailAddress')}</label>
        </div>
        <div class="form-floating mb-3">
            <input bind:value={password} class="form-control" id="password"
                   placeholder="Password" required
                   type="password">
            <label for="password">{$t('global.password')}</label>
        </div>
        <button
                class="w-100 btn btn-lg btn-primary"
                disabled={loading}
                type="submit">{$t('login.submit')}
        </button>
    </form>
</main>
