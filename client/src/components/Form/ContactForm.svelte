<script>
    import { onMount } from 'svelte';
    import { useFocus } from 'svelte-navigator';
    import { user } from '../../js/stores';
    import { displayError, displaySuccess } from '../../js/toast';
    import { request } from '../../js/fetchWrapper';
    import Lang from '../Util/Lang.svelte';

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
        await request('/api/mail', {
          method: 'POST',
          body: { name, email, message },
        });
        displaySuccess('The message was sent.');
      } catch (err) {
        displayError(err);
      } finally {
        loading = false;
      }
    };
</script>

<form on:submit|preventDefault={handleOnSubmit}>
    <div class="form-floating mb-3">
        <input bind:value={name} class="form-control" id="name"
               placeholder="Name" required type="text">
        <label for="name">Name</label>
    </div>
    <div class="form-floating mb-3">
        <input bind:value={email} class="form-control" id="email"
               placeholder="name@example.com" required type="email">
        <label for="email">Email</label>
    </div>
    <div class="mb-3">
        <label class="form-label" for="message">
            <Lang page="contact" trans="title"></Lang>
        </label>
        <textarea
                use:registerFocus
                bind:this={messageInput}
                bind:value={message}
                class="form-control"
                id="message"
                rows="5"></textarea>
    </div>

    <button class="w-100 btn btn-lg btn-primary" disabled="{loading}" type="submit">Send</button>
</form>
