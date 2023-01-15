<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { displayError, displayWarning } from '../../js/toast';
    import { request } from '../../js/fetch-wrapper';
    import PrivacyPolicyDiv from '../div/PrivacyPolicyDiv.svelte';
    import { t } from '../../js/localization';

    let email = '';
    let emailInput = null;
    let password = '';
    let name = '';
    let loading = false;
    let isOptIn = false;
    let isValidName;
    let isValidPassword;

    onMount(() => {
      emailInput.focus();
    });

    const handleOnSubmit = async () => {
      if (!isValidName) {
        displayWarning($t('global.validateName'));
        return;
      }

      if (!isValidPassword) {
        displayWarning($t('global.validatePassword'));
        return;
      }

      loading = true;

      try {
        await request('/api/auth/signup', {
          method: 'POST',
          body: { name, email, password },
        });
        navigate('/');
      } catch (err) {
        displayError($t('global.error'));
      } finally {
        loading = false;
      }
    };

    $: isValidName = password.length >= 4 && password.length <= 255;
    $: isValidPassword = password.length >= 8 && password.length <= 255;
</script>

<form on:submit|preventDefault={handleOnSubmit}>
    <div class="form-floating mb-3">
        <input bind:value={name}
               class="form-control"
               id="name"
               placeholder="Name"
               required
               type="text">
        <label for="name">{$t('global.name')}</label>
    </div>
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
    </div>
    <div class="form-check mb-3">
        <input
                bind:checked={isOptIn}
                class="form-check-input"
                id="gdpr"
                type="checkbox"
                value="">
        <label
                class="form-check-label"
                for="gdpr">{@html $t('privacyPolicy.agree')}
        </label>
    </div>
    {#if !isOptIn}
        <div class="alert alert-warning" role="alert">
            {$t('signup.optIn')}
        </div>
    {/if}

    <button class="w-100 btn btn-lg btn-primary" disabled="{!isOptIn || loading}"
            type="submit">{$t('signup.submit')}</button>
</form>

<div aria-hidden="true"
     aria-labelledby="privacyPolicyLabel"
     class="modal fade"
     id="privacyPolicyModal"
     tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="privacyPolicyModalLabel">{$t('privacyPolicy.title')}</h1>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
                <PrivacyPolicyDiv/>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
            </div>
        </div>
    </div>
</div>
