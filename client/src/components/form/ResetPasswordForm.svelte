<script>
    import { onMount } from 'svelte';
    import { displayError, displaySuccess } from '../../js/toast';
    import { request } from '../../js/fetch-wrapper';
    import { t } from '../../js/localization';

    let email = '';
    let emailInput = null;
    let loading = false;

    onMount(() => {
      emailInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      try {
        await request('/api/auth/recover', {
          method: 'POST',
          body: { email },
        });
        displaySuccess($t('resetPassword.success'));
      } catch (err) {
        displayError($t('global.error'));
      } finally {
        email = '';
        loading = false;
      }
    };
</script>

<main class="form-login w-100 m-auto">
    <form on:submit|preventDefault={handleOnSubmit}>
        <div class="form-floating mb-3">
            <input bind:this={emailInput}
                   bind:value={email}
                   class="form-control"
                   id="emailAddress"
                   placeholder="demo@demo.com"
                   required
                   type="email">
            <label for="emailAddress">{$t('global.emailAddress')}</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" disabled="{loading}"
                type="submit">{$t('resetPassword.submit')}</button>
    </form>
</main>
