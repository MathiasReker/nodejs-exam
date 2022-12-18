<script>
    import ResetPasswordForm from '../components/Form/ResetPasswordForm.svelte';
    import Nav from '../components/Layout/Nav.svelte';
    import Pagination from '../components/Pagination.svelte';
</script>

<Nav/>

<main class="px-3">
    <Pagination page="Signup"/>

    <h1>
        Reset password
    </h1>

    <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur culpa dolor earum, eligendi
        magnam molestias nemo placeat praesentium reiciendis repellendus ut veritatis. Consequatur dolore incidunt iure
        perferendis perspiciatis voluptatem voluptatum!</p>

    <ResetPasswordForm/>
</main>
