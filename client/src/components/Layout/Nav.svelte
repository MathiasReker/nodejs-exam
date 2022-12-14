<script>
    import {link, navigate} from "svelte-navigator";
    import {user} from "../../stores.js";
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import AiOutlineUser from "svelte-icons-pack/ai/AiOutlineUser";

    const handleLogout = () => {
        $user = null
        localStorage.clear();
        navigate("/login")
    }
</script>

<header class="pb-5">
    <nav>
        <a href="/" use:link>
            <h3 class="nav nav-masthead float-start">Wine Glass Guide</h3>
        </a>
        <div class="nav nav-masthead float-end">
            <div class="btn-group">
                <a aria-expanded="false" class="dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
                   type="button">
                <span class="mx-2">
                    <Icon size="20px" src={AiOutlineUser}/>
                    {#if $user} {$user.name}{/if}
                </span>
                </a>
                <ul class="dropdown-menu">
                    {#if $user}
                        <li><a class="dropdown-item" href="/profile" use:link>Your collection</a></li>
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
                        <li><a class="dropdown-item" href="/login" use:link>Login</a></li>
                    {/if}
                </ul>
            </div>
        </div>
    </nav>
</header>
