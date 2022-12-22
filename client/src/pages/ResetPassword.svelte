<script>
    import ResetPasswordForm from '../components/Form/ResetPasswordForm.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Breadcrumbs from '../components/Breadcrumbs.svelte';

    const items = [
      { href: '/', text: 'Home' },
      { href: '/reset-password', text: 'Reset password' },
    ];
</script>

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
