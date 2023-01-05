<script>
    import { link } from 'svelte-navigator';
    import Lang from '../Util/Lang.svelte';

    const currentYear = new Date().getFullYear();
</script>

<footer class="text-muted mt-auto text-center pt-5">
    <p>© {currentYear}
        <Lang page="global" trans="title"></Lang> | <a href="/privacy-policy" use:link>Privacy Policy</a> <!-- TODO translate-->
    </p>
</footer>
