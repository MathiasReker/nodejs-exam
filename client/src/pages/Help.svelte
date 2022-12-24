<script>
    import ContactForm from '../components/Form/ContactForm.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';
    import Lang from '../components/Lang.svelte';
    import Head from './Head.svelte';
    import { languages } from '../js/language';
    import { lang } from '../js/stores';

    const items = [
      { href: '/', text: languages.global.home[$lang] },
      { href: '/help', text: languages.help.title[$lang] },
    ];
</script>

<Head title="Help"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <div class="pt-3">
        <h1>
            <Lang page="help" trans="title"></Lang>
        </h1>

        <p class="lead">
            <Lang page="help" trans="deck"></Lang>
        </p>

        <ContactForm/>
    </div>
</main>
