<script>
    import {onMount} from 'svelte';
    import {navigate} from "svelte-navigator";
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

        await fetch(`${$baseUrl}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(response => {
                if (response.data2.user) {
                    localStorage.setItem('user', JSON.stringify(response.data2.user))
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

<form class="form" on:submit|preventDefault={handleOnSubmit}>
    <div class="form__group">
        <label class="form__group__label" for="emailAddress">E-Mail Address</label>
        <input bind:this={emailAddressInput} bind:value={emailAddress} class="form__group__input" id="emailAddress"
               required type="email"/>
    </div>
    <div class="form__group">
        <label class="form__group__label" for="password">Password</label>
        <input bind:this={passwordInput} bind:value={password} class="form__group__input" id="password" required
               type="password"/>
    </div>
    <div class="form__group form__group--check">
        <input class="form__group__checkbox" id="showPassword" on:change={handleOnChange} type="checkbox"/>
        <label class="form__group__label" for="showPassword">Show Password</label>
    </div>
    <button disabled="{loading}" type="submit">Submit</button>
</form>
