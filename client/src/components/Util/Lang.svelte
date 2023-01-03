<script>
    import languages from '../../js/language';
    import { user } from '../../js/stores.js';

    export let page;
    export let trans;
</script>

{languages[page][trans][$user.settings.language]}
