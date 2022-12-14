<script>
    import {onMount} from 'svelte';
    import {baseUrl} from "../../stores.js";

    let emailAddress = "";
    let emailAddressInput = null;

    let password = "";
    let passwordInput = null;

    let loading = false;

    onMount(() => {
        emailAddressInput.focus();
    });

    const handleOnSubmit = async () => {
        loading = true;

        const user = {email: emailAddress, password: password};

        await fetch(`${$baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(response => {
                if (response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user))
                    // Force reload after the redirection
                    location.replace("/")
                    emailAddress = "";
                    password = "";
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                loading = false;
            });
    };

    const handleOnChange = (evt) => {
        // Cannot dynamically update the `type` attribute via a two-way binding to the `type` attribute.
        // Error: 'type' attribute cannot be dynamic if input uses two-way binding.
        passwordInput.setAttribute('type', evt.target.checked ? 'text' : 'password');
    }
</script>

<main class="form-signin w-100 m-auto">
    <form on:submit|preventDefault={handleOnSubmit}>
        <div class="form-floating pb-3">
            <input bind:this={emailAddressInput} bind:value={emailAddress} class="form-control" id="emailAddress"
                   placeholder="name@example.com" required type="email"/>
            <label class="form-control" for="emailAddress">E-Mail Address</label>
        </div>

        <div class="form-floating pb-3">
            <input bind:this={passwordInput} bind:value={password} class="form-control" id="password"
                   placeholder="password" required
                   type="password"/>
            <label class="form-control" for="password">Password</label>
        </div>

        <div class="form__group form__group--check">
            <input class="form__group__checkbox" id="showPassword" on:change={handleOnChange} type="checkbox"/>
            <label class="form__group__label" for="showPassword">Show Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" disabled="{loading}" type="submit">Submit</button>
    </form>
</main>
