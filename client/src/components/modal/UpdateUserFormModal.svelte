<script>
    import { user } from '../../js/user.js';
    import { request } from '../../js/fetch-wrapper';
    import { displayError, displaySuccess } from '../../js/toast';
    import { t } from '../../js/localization';

    let name = $user ? $user.name : '';

    let loading = false;

    const handleOnSubmit = async () => {
      loading = true;

      try {
        const userFetch = await request('/api/users/me', {
          method: 'PUT',
          body: {
            name,
          },
        });
        $user.name = userFetch.data.name;
        localStorage.setItem('user', JSON.stringify($user));
        displaySuccess(`Username changed to ${$user.name}`);
      } catch (err) {
        displayError($t('global.error'));
      } finally {
        loading = false;
      }
    };
</script>

<div
        aria-hidden="true"
        aria-labelledby="updateUserModalLabel"
        class="modal fade"
        id="updateUserModal"
        tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="updateUserModalLabel">{$t('settings.updateUserModalTitle')}</h1>
                <button
                        aria-label="Close"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        type="button">
                </button>
            </div>
            <form on:submit|preventDefault={handleOnSubmit}>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input bind:value={name}
                               class="form-control"
                               id="name"
                               placeholder="Name"
                               required
                               type="text">
                        <label for="name">{$t('global.name')}</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            type="button">{$t('global.close')}
                    </button>
                    <button
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            disabled="{loading}"
                            type="submit">{$t('global.save')}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
