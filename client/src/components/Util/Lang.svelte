<script>
    import languages from '../../js/language';
    import { lang, user } from '../../js/stores.js';

    export let page;
    export let trans;
</script>

{languages[page][trans][$lang]}
