<script>
    import languages from '../../js/language';
    import { lang } from '../../js/stores';

    export let page;
    export let trans;
</script>

{languages[page][trans][$lang]}
