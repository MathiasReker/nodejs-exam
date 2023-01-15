<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { displayError, displayWarning } from '../../js/toast';
    import { request } from '../../js/fetch-wrapper';
    import { user } from '../../js/user.js';
    import { t } from '../../js/localization';

    let email = '';
    let emailInput = null;
    let password = '';
    let loading = false;

    let isValidPassword;

    onMount(() => {
      emailInput.focus();
    });

    const handleOnSubmit = async () => {
      if (!isValidPassword) {
        displayWarning($t('global.validatePassword'));
        return;
      }

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
            displayError($t('global.error'));
          } finally {
            loading = false;
          }
        }
      } catch (errors) {
        displayError($t('global.error'));
      } finally {
        loading = false;
      }
    };

    $: isValidPassword = password.length >= 8 && password.length <= 255;
</script>

<main class="w-100 m-auto">

    <form on:submit|preventDefault={handleOnSubmit}>
        <div class="form-floating mb-3">
            <input bind:this={emailInput}
                   bind:value={email}
                   class="form-control"
                   id="email"
                   placeholder="demo@demo.com"
                   required
                   type="email">
            <label for="email">{$t('global.emailAddress')}</label>
        </div>
        <div class="form-floating mb-3">
            <input bind:value={password}
                   class="form-control"
                   id="password"
                   placeholder="Password"
                   required
                   type="password">
            <label for="password">{$t('global.password')}</label>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Check this checkbox to continue.</div>
        </div>
        <button
                class="w-100 btn btn-lg btn-primary"
                disabled={loading}
                type="submit">{$t('login.submit')}
        </button>
    </form>
</main>
