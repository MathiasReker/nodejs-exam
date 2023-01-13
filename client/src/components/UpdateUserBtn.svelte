<script>
    import UpdateUserFormModal from './modal/UpdateUserFormModal.svelte';
    import { t } from '../js/localization';
</script>

<button
        class="btn btn-secondary"
        data-bs-target="#updateUserModal"
        data-bs-toggle="modal"
        type="button">
    {$t('settings.updateUserBtn')}
</button>

<UpdateUserFormModal/>
