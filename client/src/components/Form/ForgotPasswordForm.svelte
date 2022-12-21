<script>
    import { onMount } from 'svelte';
    import { baseUrl } from '../../js/stores';
    import { displayError, displaySuccess } from '../../js/toast';
    import { request } from '../../js/fetchWrapper.js';

    let email = '';

    let emailInput = null;

    let loading = false;

    onMount(() => {
      emailInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      await request(`/api/users/${email}/recover`, {
        method: 'POST',
      }).then(() => {
        displaySuccess('If the user exists an email is send.');
        email = '';
      }).catch(() => {
        displayError('Something went wrong.');
      }).finally(() => {
        loading = false;
      });
    };
</script>

<main class="form-signin w-100 m-auto">
    <form on:submit|preventDefault={handleOnSubmit}>
        <div class="form-floating mb-3">
            <input bind:this={emailInput} bind:value={email} class="form-control" id="emailAddress"
                   placeholder="name@example.com" required type="email">
            <label for="emailAddress">Email address</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" disabled="{loading}" type="submit">Submit</button>
    </form>
</main>
