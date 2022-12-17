<script>
    import { onMount } from 'svelte';
    import { baseUrl, user } from '../../stores.js';
    import { displayError, displaySuccess } from '../../toast.js';

    let email = $user.email || '';
    let emailInput = null;

    let name = $user.name || '';
    let nameInput = null;

    let message = '';
    let messageInput = null;

    let loading = false;

    onMount(() => {
      messageInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      // Log user into account.
      await fetch(`${$baseUrl}/api/mail`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      }).then(() => {
        message = '';
        displaySuccess('message sendt..');
      }).catch(() => {
        displayError('Something went wrong...');
      }).finally(() => {
        loading = false;
      });
    };
</script>

<form on:submit|preventDefault={handleOnSubmit}>
    <div class="form-floating mb-3">
        <input bind:this={nameInput} bind:value={name} class="form-control" id="name"
               placeholder="Name" required type="text">
        <label for="name">Name</label>
    </div>
    <div class="form-floating mb-3">
        <input bind:this={emailInput} bind:value={email} class="form-control" id="email"
               placeholder="name@example.com" required type="email">
        <label for="email">Email</label>
    </div>
    <div class="mb-3">
        <label class="form-label" for="message">How can we help?</label>
        <textarea bind:this={messageInput} bind:value={message} class="form-control" id="message" rows="5"></textarea>
    </div>

    <button class="w-100 btn btn-lg btn-primary" disabled="{loading}" type="submit">Send</button>
</form>
