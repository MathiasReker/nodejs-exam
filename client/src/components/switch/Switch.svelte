<script>
    export let checked;
    export let onChange;
    export let value;
    export let disabled;
</script>

<div class="form-check form-switch form-switch-md">
    <input checked={checked}
           class="form-check-input"
           disabled="{disabled}"
           id="{value}"
           on:change={onChange}
           role="switch"
           type="checkbox"
           {value}>
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
