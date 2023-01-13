<script>
    import { useLocation, useNavigate } from 'svelte-navigator';
    import { user } from '../js/stores';

    const navigate = useNavigate();
    const location = useLocation();

    $: if (!$user) {
      navigate('/login', {
        state: { from: $location.pathname },
        replace: true,
      });
    }
</script>

{#if $user}
    <slot/>
{/if}
