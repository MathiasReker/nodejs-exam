<script>
    import { user } from '../../js/stores.js';
    import { request } from '../../js/fetchWrapper.js';
    import { displayError, displaySuccess } from '../../js/toast.js';

    let name = $user ? $user.name : '';
    let nameInput = null;

    let loading = false;

    const handleOnSubmit = async () => {
      loading = true;
      // todo validate

      await request(`/api/users/${$user.email}`, {
        method: 'PUT',
        body: {
          name,
        },
      }).then((res) => {
        $user.name = res.data.user.name;

        displaySuccess(`Username changed to ${$user.name}`);
      }).catch(() => {
        displayError('Something went wrong.');
      }).finally(() => {
        loading = false;
      });
    };
</script>

<div aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <form on:submit|preventDefault={handleOnSubmit}>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input bind:this={nameInput} bind:value={name} class="form-control" id="name"
                               placeholder="Name" required type="text">
                        <label for="name">Name</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" disabled="{loading}" type="submit">Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
