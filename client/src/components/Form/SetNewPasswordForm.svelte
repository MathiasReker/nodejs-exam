<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { displayError, displaySuccess } from '../../js/toast';
    import { request } from '../../js/fetchWrapper';

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');
    let password = '';
    let passwordInput = null;
    let loading = false;
    onMount(() => {
      passwordInput.focus();
    });
    const handleOnSubmit = async () => {
      loading = true;

      try {
        await request(`/api/auth/reset`, {
          method: 'PUT',
          body: {
            email,
            password,
            token,
          },
        });
        displaySuccess('Password successfully resat.');
        navigate('/signin');
      } catch (err) {
        displayError(err);
      } finally {
        loading = false;
      }
    };
 </script>

<main class="form-signin w-100 m-auto">
    {#if email && token}
        <form on:submit|preventDefault={handleOnSubmit}>
            <div class="form-floating mb-3">
                <input value={email} class="form-control" id="email"
                       placeholder="name@example.com" required disabled type="email">
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
    {/if}
</main>
