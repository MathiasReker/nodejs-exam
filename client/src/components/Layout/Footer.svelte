<script>
    import Lang from '../Util/Lang.svelte';

    const currentYear = new Date().getFullYear();
</script>

<footer class="text-muted mt-auto text-center pt-5">
    <p>© {currentYear}
        <Lang page="global" trans="title"></Lang>
    </p>
</footer>
