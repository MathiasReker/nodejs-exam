<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { baseUrl } from '../../js/stores';
    import { displayError } from '../../js/toast';

    let email = '';
    let emailInput = null;

    let password = '';
    let passwordInput = null;

    let name = '';
    let nameInput = null;

    let loading = false;

    onMount(() => {
      emailInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      await fetch(`${$baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      }).then(() => {
        navigate('/');
        location.reload();
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
        <label for="email">Email address</label>
    </div>
    <div class="form-floating mb-3">
        <input bind:this={passwordInput} bind:value={password} class="form-control" id="password"
               placeholder="Password" required
               type="password">
        <label for="password">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" disabled="{loading}" type="submit">Submit</button>
</form>
