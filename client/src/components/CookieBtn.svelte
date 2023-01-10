<script>
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidCookieBite from 'svelte-icons-pack/fa/FaSolidCookieBite';
</script>

<div class="m-3" data-bs-target="#exampleModal2" data-bs-toggle="modal" id="cookieConsentBtn" type="button">
    <Icon color="#457373" size="50px" src={FaSolidCookieBite}/>
</div>

<style>
    #cookieConsentBtn {
        position: fixed;
        bottom: 0;
        left: 0;
    }
</style>
