<script>
    import {onMount} from 'svelte';
    import {baseUrl} from "../../stores.js";

    let email = "";
    let emailInput = null;

    let password = "";
    let passwordInput = null;

    let name = "";
    let nameInput = null;

    onMount(() => {
        emailInput.focus();
    });

    const handleOnSubmit = async () => {
        // Log user into account.
        const response = await fetch(`${$baseUrl}/api/auth/register`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({name, email, password}),
        });
        if (response.ok) {
            location.replace("/");
        } else {
            alert("error");
        }
    };

    const handleOnChange = (evt) => {
        // Cannot dynamically update the `type` attribute via a two-way binding to the `type` attribute.
        // Error: 'type' attribute cannot be dynamic if input uses two-way binding.
        passwordInput.setAttribute('type', evt.target.checked ? 'text' : 'password');
    }
</script>

<form class="form" on:submit|preventDefault={handleOnSubmit}>
    <div class="form__group">
        <label class="form__group__label" for="name">Name</label>
        <input bind:this={nameInput} bind:value={name} class="form__group__input" id="name" required
               type="text"/>
    </div>
    <div class="form__group">
        <label class="form__group__label" for="email">E-Mail Address</label>
        <input bind:this={emailInput} bind:value={email} class="form__group__input" id="email"
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
    <button type="submit">Submit</button>
</form>
