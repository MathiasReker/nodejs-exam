<script>
    import { navigate } from 'svelte-navigator';
    import { user } from '../../../js/user.js';

    if (!$user) {
      navigate('/login', {
        replace: true,
      });
    }
</script>

{#if $user}
    <slot/>
{/if}
