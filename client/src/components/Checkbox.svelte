<script>
    import { baseUrl, user } from '../js/stores';
    import { displayError, displaySuccess } from '../js/toast';

    export let bindGroup = [];
    export let value = '';

    const onChange = ({ target }) => {
      const { value, checked } = target;
      if (checked) {
        bindGroup = [...bindGroup, value];
      } else {
        bindGroup = bindGroup.filter((item) => item !== value);
      }

      // save to database
      (() => {
        fetch(`${$baseUrl}/api/users/${$user.email}/wineGlasses`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': $user.token,
          },
          body: JSON.stringify({
            email: $user.email,
            wineGlasses: bindGroup,
          }),
        })
          .then((response) => response.json())
          .then(() => {
            $user.wineGlasses = bindGroup;
            localStorage.setItem('user', JSON.stringify($user));

            displaySuccess('Settings saved!');
          })
          .catch(() => {
            displayError('Something went wrong...');
          });
      })();
    };
</script>

<input checked={bindGroup.includes(value)}
       class="form-check-input custom-switch"
       on:change={onChange}
       role="switch"
       type="checkbox"
       {value}>

<style>
    .custom-switch {
        font-size: 150%;
    }
</style>
