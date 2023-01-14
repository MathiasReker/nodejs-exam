<script>
    import { onMount } from 'svelte';
    import { Modal } from 'bootstrap';

    import cookies from 'js-cookie';
    import CookieSwitch from './CookiesSwitch.svelte';
    import CookieBtn from '../button/CookieButton.svelte';
    import { cookieConsent } from '../../js/cookie-consent.js';
    import { t } from '../../js/localization.js';

    let collapse;

    let cookieConsentModal;

    let isOpen = false;

    onMount(() => {
      if (!cookies.get('cookieConsent')) {
        new Modal(cookieConsentModal).show();
      }
    });

    const handleOnCollapse = () => {
      isOpen = collapse.getAttribute('aria-expanded') === 'true';
    };

    const cookieOptions = [
      {
        displayName: $t('cookieConsent.necessary'),
        technicalName: 'necessary',
        description: [$t('cookieConsent.necessaryListItem1')],
        value: true,
        disabled: true,
      },
      {
        displayName: $t('cookieConsent.statistics'),
        technicalName: 'statistics',
        description: [$t('cookieConsent.statisticsListItem1')],
        value: false,
        disabled: false,
      },
      {
        displayName: $t('cookieConsent.marketing'),
        technicalName: 'marketing',
        description: [$t('cookieConsent.marketingListItem1')],
        value: false,
        disabled: false,
      },
      {
        displayName: $t('cookieConsent.personalization'),
        technicalName: 'personalization',
        description: [
          $t('cookieConsent.personalizationListItem1'),
          $t('cookieConsent.personalizationListItem2'),
          $t('cookieConsent.personalizationListItem3'),
        ],
        value: false,
        disabled: false,
      },
    ];

    const cookieDaysToExpire = 365;

    const handleAcceptAllCookies = () => {
      cookieOptions.forEach((cookie) => {
        $cookieConsent[cookie.technicalName] = true;
      });

      cookies.set('cookieConsent', JSON.stringify($cookieConsent), {
        path: '/',
        expires: cookieDaysToExpire,
        sameSite: 'strict',
        secure: import.meta.env.VITE_ENV !== 'development',
      });
    };

    const handleDisagreeToCookies = () => {
      cookieOptions.filter((cookie) => cookie.technicalName !== 'necessary').forEach((cookie) => {
        $cookieConsent[cookie.technicalName] = false;
      });

      cookies.set('cookieConsent', JSON.stringify($cookieConsent), {
        path: '/',
        expires: cookieDaysToExpire,
        sameSite: 'strict',
        secure: import.meta.env.VITE_ENV !== 'development',
      });
    };
</script>

<div aria-hidden="true"
     aria-labelledby="cookieConsentModalLabel"
     bind:this={cookieConsentModal}
     class="modal fade"
     data-bs-backdrop="static"
     data-bs-keyboard="false"
     id="cookieConsentModal"
     tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="CookieConsentModalLabel">{$t('cookieConsent.title')}</h1>
            </div>
            <div class="modal-body">
                <p>{$t('cookieConsent.description')}</p>
                <div>
                    <button aria-controls="cookieConsentCollapse"
                            aria-expanded="false"
                            bind:this={collapse}
                            class="btn btn-primary mb-3"
                            data-bs-target="#cookieConsentCollapse"
                            data-bs-toggle="collapse"
                            on:click={handleOnCollapse}
                            type="button">
                        {$t('cookieConsent.collapseBtn')}
                    </button>
                </div>
                <div class="collapse" id="cookieConsentCollapse">
                    {#each cookieOptions as cookie}
                        <div class="mb-3">
                            <div>
                                <CookieSwitch value="{cookie.technicalName}"
                                              display="{cookie.displayName}"
                                              disabled="{cookie.disabled}"
                                              cookieDaysToExpire="{cookieDaysToExpire}"/>
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
                    <button class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            type="button"
                            on:click={handleDisagreeToCookies}>{$t('cookieConsent.agreeNoBtn')}
                    </button>
                    <button class="btn btn-primary"
                            data-bs-dismiss="modal"
                            type="button"
                            on:click={handleAcceptAllCookies}>
                        {$t('cookieConsent.agreeBtn')}
                    </button>
                {:else}
                    <button class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            type="button">{$t('cookieConsent.agreeSelectionBtn')}</button>
                    <button class="btn btn-primary"
                            data-bs-dismiss="modal"
                            type="button"
                            on:click={handleAcceptAllCookies}>{$t('cookieConsent.agreeAllBtn')}
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
