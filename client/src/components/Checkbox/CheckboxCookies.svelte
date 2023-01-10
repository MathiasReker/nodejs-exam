<script>
    import { displaySuccess } from '../../js/toast';
    import { getCookie, setCookie } from '../../js/cookie';

    let cookieConsent = getCookie('cookie') || {};

    export let value = '';
    export let disabled;
    export let display;

    const onChange = ({ target }) => {
      // eslint-disable-next-line no-shadow
      const { value, checked } = target;

      cookieConsent = getCookie('cookie');

      cookieConsent[value] = checked;

      setCookie('cookie', cookieConsent, 10);

      displaySuccess('Settings saved!');
    };
</script>

<div class="form-check form-switch form-switch-md">
    <input checked={cookieConsent[value]}
           class="form-check-input"
           disabled="{disabled}"
           on:change={onChange}
           role="switch"
           type="checkbox"
           id="{value}"
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
