import { toast } from '@zerodevx/svelte-toast';

export const displaySuccess = (message) => toast.push(message, {
  theme: {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(72,187,120,0.9)',
    '--toastBarBackground': '#2F855A',
  },
});

// TODO Stylling
export const displayError = (message) => toast.push(message, {
  theme: {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(72,187,120,0.9)',
    '--toastBarBackground': '#2F855A',
  },
});
/*
export const warning = m => toast.push(m, { theme: { ... } })

export const failure = m => toast.push(m, { theme: { ... } })

 */
