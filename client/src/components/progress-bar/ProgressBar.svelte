<script>
    export let valueNow;
    export let valueTotal;
</script>

<div class="progress mb-3" style="height: 20px">
    <div
            aria-label="20px high"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow="{valueNow}"
            class="progress-bar bg-secondary"
            role="progressbar"
            style="width: {valueTotal}%">
    </div>
</div>
