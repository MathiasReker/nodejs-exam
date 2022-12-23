<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { displayError } from '../../js/toast';
    import { request } from '../../js/fetchWrapper';

    let email = '';
    let emailInput = null;

    let password = '';
    let passwordInput = null;

    let loading = false;

    onMount(() => {
      emailInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      const user = { email, password };

      await request('/api/auth/signin', {
        method: 'POST',
        body: user,
      })
        .then((res) => {
          if (res.data.user) {
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/');
            location.reload();
          }
        }).catch(() => {
          displayError('The user does not exists.');
        })
        .finally(() => {
          loading = false;
        });
    };
</script>

<main class="w-100 m-auto">
    <form on:submit|preventDefault={handleOnSubmit}>
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

        <button class="w-100 btn btn-lg btn-primary" disabled={loading} type="submit">Submit</button>
    </form>
</main>
