<script>
    import {onMount} from 'svelte';
    import {baseUrl} from "../../stores.js";
    import {displayError, displaySuccess} from "../../toast.js";
    import {navigate} from "svelte-navigator";

    const urlParams = new URLSearchParams(location.search);
    let email = urlParams.get("email");
    let token = urlParams.get("token");

    let password = "";
    let passwordInput = null;

    let loading = false;

    onMount(() => {
        passwordInput.focus();
    });

    const handleOnSubmit = async () => {
        loading = true;

        await fetch(`${$baseUrl}/api/users/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                 password,
                 token
            })
        })
            .then(response => response.json())
            .then((response) => {
                if (response.error) {
                    displayError(response.error)
                } else {
                    displaySuccess("Password successfully resat.")
                    navigate("/login")
                }
            }).catch(() => {
                displayError("The user does not exists.")
            }).finally(() => {
                loading = false;
            });
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
