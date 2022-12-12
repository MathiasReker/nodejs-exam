<script>
    export let label = "";
    export let bindGroup = [];
    export let value = "";

    const onChange = ({target}) => {
        const {value, checked} = target;
        if (checked) {
            bindGroup = [...bindGroup, value]
        } else {
            bindGroup = bindGroup.filter((item) => item !== value);
        }
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
