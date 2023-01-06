<script>
    import { user } from '../../js/stores';
    import { displayError, displaySuccess } from '../../js/toast';
    import { request } from '../../js/fetchWrapper';

    export let bindGroup = [];
    export let checkbox = '';

    const onChange = ({ target }) => {
      const { value, checked } = target;
      if (checked) {
        bindGroup = [...bindGroup, value];
      } else {
        bindGroup = bindGroup.filter((item) => item !== value);
      }

      // save to database
      (() => {
        request(`/api/users/${$user.email}/wineGlasses`, {
          method: 'PUT',
          body: {
            email: $user.email,
            wineGlasses: bindGroup,
          },
        })
          .then((res) => {
            $user.settings.wineGlasses = res.data.wineGlasses;
            localStorage.setItem('user', JSON.stringify($user));

            displaySuccess('Settings saved!');
          })
          .catch(() => {
            displayError('Something went wrong...');
          });
      })();
    };
</script>

<div class="form-check form-switch form-switch-md">
    <input checked={bindGroup.includes(checkbox)}
           class="form-check-input"
           on:change={onChange}
           role="switch"
           type="checkbox"
           {checkbox}>
</div>

<style>
    .form-check-input {
        clear: left;
    }

    .form-switch.form-switch-md .form-check-input {
        height: 1.5rem;
        width: calc(2rem + 0.75rem);
        border-radius: 3rem;
    }
</style>
