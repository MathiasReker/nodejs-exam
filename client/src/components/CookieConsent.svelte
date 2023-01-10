<script>
    import { onMount } from 'svelte';
    import { Modal } from 'bootstrap';

    import CheckboxCookies from './Checkbox/CheckboxCookies.svelte';
    import CookieBtn from './CookieBtn.svelte';
    import { setCookie } from '../js/cookie.js';
    import { cookieConsent } from '../js/stores.js';

    const cookieStorageDays = 365;

    let collapseExample;

    let cookieConsentModal;

    let isOpen = false;

    onMount(() => {
      new Modal(cookieConsentModal).show();
    });

    const handleOnCollapse = () => {
      isOpen = collapseExample.getAttribute('aria-expanded') === 'true';
    };

    const cookies = [
      {
        displayName: 'Necessary',
        technicalName: 'necessary',
        description: ['Required to run the website'],
        value: true,
        disabled: true,
      },
      {
        displayName: 'Statistics',
        technicalName: 'statistics',
        description: ['Monitoring website usage and optimizing the user experience'],
        value: false,
        disabled: false,
      },
      {
        displayName: 'Marketing',
        technicalName: 'marketing',
        description: ['Evaluation of marketing actions'],
        value: false,
        disabled: false,
      },
      {
        displayName: 'Personalization',
        technicalName: 'personalization',
        description: [
          'Storage of your preferences from previous visits',
          'Collecting user feedback to improve our website',
          'Recording of your interests in order to provide customised content and offers',
        ],
        value: false,
        disabled: false,
      },
    ];

    const handleAcceptAllCookies = () => {
      cookies.forEach((cookie) => {
        $cookieConsent[cookie.technicalName] = true;
      });

      setCookie('cookie', $cookieConsent, 10);
    };

    const handleDisagreeToCookies = () => {
      cookies.filter((cookie) => cookie.technicalName !== 'necessary').forEach((cookie) => {
        $cookieConsent[cookie.technicalName] = false;
      });

      setCookie('cookie', $cookieConsent, 10);
    };
</script>

<!-- Modal -->
<div aria-hidden="true" aria-labelledby="exampleModal2Label" bind:this={cookieConsentModal} class="modal fade"
     id="exampleModal2"
     tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModal2Label">Privacy Settings</h1>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
                <p>By clicking “Accept all cookies”, you agree Stack Exchange can store cookies on your device and
                    disclose information in accordance with our Cookie Policy.</p>
                <div>
                    <button aria-controls="collapseExample" aria-expanded="false" bind:this={collapseExample}
                            class="btn btn-primary mb-3" data-bs-target="#collapseExample"
                            data-bs-toggle="collapse" on:click={handleOnCollapse} type="button">
                        My settings
                    </button>
                </div>
                <div class="collapse" id="collapseExample">
                    {#each cookies as cookie}
                        <div class="mb-3">
                            <div class="">
                                <CheckboxCookies value="{cookie.technicalName}" display="{cookie.displayName}"
                                                 disabled="{cookie.disabled}"/>
                                <ul class="list-group">
                                    {#each cookie.description as description}
                                        <li>{description}</li>
                                    {/each}
                                </ul>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="modal-footer">
                {#if !isOpen}
                    <button class="btn btn-secondary" data-bs-dismiss="modal" type="button"
                            on:click={handleDisagreeToCookies}>I do not agree
                    </button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" type="button"
                            on:click={handleAcceptAllCookies}>
                        Agree
                    </button>
                {:else}
                    <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Agree to selection</button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" type="button"
                            on:click={handleAcceptAllCookies}>Agree to all
                    </button>
                {/if}
            </div>
        </div>
    </div>
</div>

<CookieBtn/>

<style>
    ul {
        padding-left: 80px;
    }
</style>
