<script>
    import { onMount } from 'svelte';
    import { baseUrl } from '../../stores.js';
    import { displayError } from '../../toast.js';

    let emailAddress = '';
    let emailAddressInput = null;

    let password = '';
    let passwordInput = null;

    let loading = false;

    onMount(() => {
      emailAddressInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      const user = { email: emailAddress, password };

      await fetch(`${$baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // Force reload after the redirection
            location.replace('/');
            emailAddress = '';
            password = '';
          }
        }).catch(() => {
          displayError('The user does not exists.');
        })
        .finally(() => {
          loading = false;
        });
    };
</script>

<main class="form-signin w-100 m-auto">
    <form on:submit|preventDefault={handleOnSubmit}>
        <div class="form-floating mb-3">
            <input bind:this={emailAddressInput} bind:value={emailAddress} class="form-control" id="emailAddress"
                   placeholder="name@example.com" required type="email">
            <label for="emailAddress">Email address</label>
        </div>
        <div class="form-floating mb-3">
            <input bind:this={passwordInput} bind:value={password} class="form-control" id="password"
                   placeholder="Password" required
                   type="password">
            <label for="password">Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" disabled="{loading}" type="submit">Submit</button>
    </form>
</main>
