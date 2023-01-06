<script>
    import Lang from './Util/Lang.svelte';
    import UpdateUserFormModal from './modal/UpdateUserFormModal.svelte';
</script>

<button class="btn btn-secondary" data-bs-target="#exampleModal" data-bs-toggle="modal" type="button">
    <Lang page="settings" trans="usernameBtn"></Lang>
</button>

<UpdateUserFormModal/>
