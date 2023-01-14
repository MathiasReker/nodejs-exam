<script>
    export let title;
</script>

<div class="card mb-5">
    <h5 class="card-header bg-light text-dark">
        {title}
    </h5>
    <div class="card-body">
        <slot/>
    </div>
</div>
