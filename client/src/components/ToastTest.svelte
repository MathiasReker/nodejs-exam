<script>
    import {FlatToast, ToastContainer, toasts} from "svelte-toasts";
    import {onMount} from "svelte";

    export let title = "";

    const showToast = () => {
        toasts.add({
            title: title,
            'description': "",
            duration: 3000,

            theme: 'dark',
            placement: 'bottom-right',
            type: 'success',

            onClick: () => {
            },
            onRemove: () => {
            },
        });
    };

    onMount(() => {
        showToast();
    })
</script>

<ToastContainer let:data={data} placement="bottom-right">
    <FlatToast {data}/>
</ToastContainer>