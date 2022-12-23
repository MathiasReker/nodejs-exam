<script>
    import { link, navigate } from 'svelte-navigator';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FiUser from 'svelte-icons-pack/fi/FiUser';
    import IoWine from 'svelte-icons-pack/io/IoWine';
    import { user } from '../../js/stores';

    export let color = '#514945';
    export let background = 'transparent';

    const handleLogout = () => {
      $user = null;
      localStorage.clear();
      navigate('/signin');
    };
</script>

<header style="padding-bottom: 80px;">
    <div class=" mx-auto fixed-top fixed-top {background ? 'box-shadow' : ''}" id="nav-wrapper"
         style="background-color: {background}">
        <nav class="cover-container navbar mx-auto px-3">
            <a class="navbar-brand" href="/" use:link>
                <span class="align-items-center" style="color: {color}">
                    <Icon color="{color}" size="25px" src={IoWine}/> Wine Glass Guide
                </span>
            </a>

            <div class="btn-group">
                <a aria-expanded="false" class="dropdown-toggle" data-bs-toggle="dropdown" href="#"
                   style="color: {color}">
                <span class="align-items-center" style="color: {color}">
                    <Icon color="{color}" size="25px" src={FiUser}/>
                    {#if $user} {$user.name}{/if}
                </span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    {#if $user}
                        <li><a class="dropdown-item" href="/wine-glasses" use:link>Your wine glasses</a></li>
                        <li><a class="dropdown-item" href="/profile" use:link>Your profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="/settings" use:link>Settings</a></li>
                        <li><a class="dropdown-item" href="/about" use:link>Help</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#" on:click={handleLogout} use:link>Log out</a></li>
                    {:else}
                        <li><a class="dropdown-item" href="/signin" use:link>signin</a></li>
                    {/if}
                </ul>
            </div>
        </nav>
    </div>
</header>

<style>
    .box-shadow {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(8px);
    }
</style>
