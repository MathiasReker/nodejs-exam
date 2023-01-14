<script>
    import { link, navigate } from 'svelte-navigator';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FiUser from 'svelte-icons-pack/fi/FiUser';
    import IoWine from 'svelte-icons-pack/io/IoWine';
    import { user } from '../../js/user.js';
    import { t } from '../../js/localization';

    export let color = '#514945';
    export let background = 'transparent';
    export let sticky = true;

    const handleLogout = () => {
      $user = null;
      localStorage.clear();
      navigate('/login');
    };
</script>

<header style="margin-bottom: {sticky ? '80' : '0'}px">
    <div class="mx-auto {sticky ? 'fixed-top' : ''} {background ? 'box-shadow' : ''}" id="nav-wrapper"
         style="background-color: {background}">
        <nav class="cover-container navbar mx-auto px-3">
            <a class="navbar-brand" href="/" use:link>
                <span class="align-items-center" style="color: {color}">
                    <Icon color="{color}" size="25px" src={IoWine}/>
                    {$t('global.title')}
                </span>
            </a>

            <div class="btn-group">
                <a aria-expanded="false"
                   class="dropdown-toggle"
                   data-bs-toggle="dropdown"
                   href="#user"
                   style="color: {color}">
                <span class="align-items-center" style="color: {color}">
                    <Icon color="{color}" size="25px" src={FiUser}/>
                    {#if $user} {$user.name}{/if}
                </span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    {#if $user}
                        <li><a class="dropdown-item" href="/wine-glasses" use:link>
                            {$t('nav.myWineGlasses')}</a></li>
                        <li><a class="dropdown-item" href="/profile" use:link>{$t('nav.myProfile')}</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="/settings" use:link>{$t('nav.settings')}</a></li>
                        <li><a class="dropdown-item" href="/contact" use:link>{$t('nav.contact')}</a></li>
                        <li><a class="dropdown-item" href="/about" use:link>{$t('nav.about')}</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <button class="dropdown-item" on:click={handleLogout}>{$t('nav.logOut')}</button>
                        </li>
                    {:else}
                        <li><a class="dropdown-item" href="/login" use:link>{$t('nav.logIn')}</a></li>
                        <li><a class="dropdown-item" href="/contact" use:link>{$t('nav.contact')}</a></li>
                        <li><a class="dropdown-item" href="/about" use:link>{$t('nav.about')}</a></li>
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
