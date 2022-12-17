<script>
    import {onMount} from 'svelte';
    import {baseUrl} from "../../stores.js";
    import {displayError, displaySuccess} from "../../toast.js";

    let emailAddress = "";
    let emailAddressInput = null;

    let loading = false;

    onMount(() => {
        emailAddressInput.focus();
    });

    const handleOnSubmit = async () => {
        loading = true;

        const user = {email: emailAddress};

        await fetch(`${$baseUrl}/api/users/recover`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(() => {
                displaySuccess("If the user exists an email is send.")
                // todo: display message below form instead
                emailAddress = "";

            }).catch(() => {
                displayError("The user does not exists.")
            }).finally(() => {
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

        <button class="w-100 btn btn-lg btn-primary" disabled="{loading}" type="submit">Submit</button>
    </form>
</main>
