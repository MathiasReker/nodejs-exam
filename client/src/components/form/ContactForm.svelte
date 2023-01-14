<script>
    import { onMount } from 'svelte';
    import { useFocus } from 'svelte-navigator';
    import { user } from '../../js/user.js';
    import { displayError, displaySuccess } from '../../js/toast';
    import { request } from '../../js/fetch-wrapper';
    import { t } from '../../js/localization';

    const registerFocus = useFocus();

    let email = $user ? $user.email : '';
    let name = $user ? $user.name : '';

    let message = '';
    let messageInput = null;

    let loading = false;

    onMount(() => {
      messageInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      try {
        await request('/api/mails', {
          method: 'POST',
          body: { name, email, message },
        });
        displaySuccess($t('contact.successfullySent'));
      } catch (err) {
        displayError($t('global.error'));
      } finally {
        message = '';
        messageInput.focus();
        loading = false;
      }
    };
</script>

<form on:submit|preventDefault={handleOnSubmit}>
    <div class="form-floating mb-3">
        <input bind:value={name} class="form-control" id="name"
               placeholder="Name" required type="text">
        <label for="name">{$t('global.name')}</label>
    </div>
    <div class="form-floating mb-3">
        <input bind:value={email} class="form-control" id="email"
               placeholder="demo@demo.com" required type="email">
        <label for="email">{$t('global.emailAddress')}</label>
    </div>
    <div class="mb-3">
        <label class="form-label" for="message">
            {$t('contact.title')}
        </label>
        <textarea
                bind:this={messageInput}
                bind:value={message}
                class="form-control"
                id="message"
                rows="5"
                use:registerFocus></textarea>
    </div>

    <button class="w-100 btn btn-lg btn-primary" disabled="{loading}" type="submit">{$t('contact.submit')}</button>
</form>
