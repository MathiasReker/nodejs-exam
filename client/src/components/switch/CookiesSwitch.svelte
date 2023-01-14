<script>
    import cookies from 'js-cookie';
    import { cookieConsent } from '../../js/cookie-consent';

    export let value = '';
    export let disabled;
    export let display;
    export let cookieDaysToExpire;

    const onChange = ({ target }) => {
      // eslint-disable-next-line no-shadow
      const { value, checked } = target;

      $cookieConsent[value] = checked;

      cookies.set('cookieConsent', JSON.stringify($cookieConsent), {
        path: '/',
        expires: cookieDaysToExpire,
        sameSite: 'strict',
        secure: import.meta.env.VITE_ENV !== 'development',
      });
    };
</script>

<div class="form-check form-switch form-switch-md">
    <input checked={$cookieConsent[value]}
           class="form-check-input"
           disabled="{disabled}"
           id="{value}"
           on:change={onChange}
           role="switch"
           type="checkbox"
           {value}>

    <label class="form-check-label px-3 lead" for="{value}"><strong>{display}</strong></label>
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
