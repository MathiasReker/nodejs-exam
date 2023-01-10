<script>
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidCookieBite from 'svelte-icons-pack/fa/FaSolidCookieBite';
</script>

<div id="cookieConsentBtn" class="m-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">
    <Icon color="#457373" size="50px" src={FaSolidCookieBite}/>
</div>

<style>
    #cookieConsentBtn {
        position: fixed;
        bottom: 0; left: 0;
    }
</style>
