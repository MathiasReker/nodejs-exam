<script>
    import ResetPasswordForm from '../components/Form/ResetPasswordForm.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Layout/Breadcrumbs.svelte';
    import Head from './Head.svelte';
    import { languages } from '../js/language';
    import { lang } from '../js/stores';

    const items = [
      { href: '/', text: languages.global.home[$lang] },
      { href: '/reset-password', text: languages.resatPassword.title[$lang] },
    ];
</script>

<Head title="Reset password"/>

<Nav/>

<main class="px-3">
    <Breadcrumbs {items}/>

    <h1>
        Reset password
    </h1>

    <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur culpa dolor earum, eligendi
        magnam molestias nemo placeat praesentium reiciendis repellendus ut veritatis. Consequatur dolore incidunt iure
        perferendis perspiciatis voluptatem voluptatum!</p>

    <ResetPasswordForm/>
</main>
