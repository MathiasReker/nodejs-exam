<script>
    import ContactForm from "../components/Form/ContactForm.svelte";
    import Nav from "../components/Layout/Nav.svelte";
    import Pagenation from "../components/Pagenation.svelte";
</script>

<Nav/>

<main class="px-3">

    <Pagenation page="Help"/>

    <h1>Cool project...</h1>

    <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur culpa dolor earum, eligendi
        magnam molestias nemo placeat praesentium reiciendis repellendus ut veritatis. Consequatur dolore incidunt iure
        perferendis perspiciatis voluptatem voluptatum!</p>

    <ContactForm/>
</main>
