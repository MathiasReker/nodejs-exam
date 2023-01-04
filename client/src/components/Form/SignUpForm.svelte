<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { displayError } from '../../js/toast';
    import { request } from '../../js/fetchWrapper';
    import PrivacyPolicyDiv from "../PrivacyPolicyDiv.svelte";

    let email = '';
    let emailInput = null;

    let password = '';
    let passwordInput = null;

    let name = '';
    let nameInput = null;

    let loading = false;

    let isOptIn = false;

    onMount(() => {
      emailInput.focus();
    });

    const handleOnSubmit = async () => {
      loading = true;

      await request('/api/auth/signup', {
        method: 'POST',
        body: { name, email, password },
      }).then(() => {
        navigate('/');
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
    <div class="form-check mb-3">
        <input bind:checked={isOptIn} class="form-check-input" id="gdpr" type="checkbox" value="">
        <label class="form-check-label" for="gdpr">
            I agree to the <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">privacy policy</a>
        </label>
    </div>
    {#if !isOptIn}
        <div class="alert alert-warning" role="alert">
            You must opt-in to continue.
        </div>
    {/if}

    <button class="w-100 btn btn-lg btn-primary" disabled="{!isOptIn || loading}" type="submit">Submit</button>
</form>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <PrivacyPolicyDiv/>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
