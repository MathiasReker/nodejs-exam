<script>
    import ResetPasswordForm from '../components/Form/ResetPasswordForm.svelte';
    import languages from '../js/language';
    import { lang } from '../js/stores';
    import Page from './Page.svelte';

    const title = languages.resatPassword.title[$lang];

    const breadcrumbs = [
      { href: '/', text: languages.global.home[$lang] },
      { href: location.pathname, text: title },
    ];
</script>

<Page breadcrumbs="{breadcrumbs}" title="{title}">
    <h1>
        Reset password
    </h1>

    <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur culpa dolor earum, eligendi
        magnam molestias nemo placeat praesentium reiciendis repellendus ut veritatis. Consequatur dolore incidunt iure
        perferendis perspiciatis voluptatem voluptatum!</p>

    <ResetPasswordForm/>
</Page>
