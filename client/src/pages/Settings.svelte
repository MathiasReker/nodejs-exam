<script>
    import {baseUrl, user} from "../stores.js";

    let loading = false;

    const handleOnSubmitExport = async () => {
        const csv = async () => {
            return await fetch(`${$baseUrl}/api/settings/csv`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "auth-token": $user.token
                },
            }).then(response => response.json());
        };
    }

</script>

<main class="px-3">
    <div>
        <h2>Change username</h2>
        <hr>
        <p>Changing your username can have unintended side effects.</p>
        <button class="btn btn-secondary" type="button">Change username</button>
    </div>

    <div class="pt-5">
        <h2>Export account data</h2>
        <hr>
        <p>Export all repositories and profile metadata for @MathiasReker. Exports will be available for 7 days. </p>
        <button class="btn btn-secondary" on:submit|preventDefault={handleOnSubmitExport} type="button">Start export
        </button>
    </div>

    <div class="pt-5">
        <h2 class="text-danger">Delete account</h2>
        <hr>
        <p>Your account is currently </p>
        <button class="btn btn-danger" type="button">Delete your account</button>
    </div>
</main>
