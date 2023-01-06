import { toast } from '@zerodevx/svelte-toast';

export const displaySuccess = (message) => toast.push(message, {
  theme: {
    '--toastColor': '#FFF',
    '--toastBackground': '#48bb8f',
    '--toastBarBackground': '#102526',
  },
});

export const displayError = (message) => toast.push(message, {
  theme: {
    '--toastColor': '#FFF',
    '--toastBackground': '#8d2100',
    '--toastBarBackground': '#102526',
  },
});

export const displayInfo = (message) => toast.push(message, {
  theme: {
    '--toastColor': '#FFF',
    '--toastBackground': '#205e79',
    '--toastBarBackground': '#102526',
  },
});

export const displayWarning = (message) => toast.push(message, {
  theme: {
    '--toastColor': '#FFF',
    '--toastBackground': '#9B8148',
    '--toastBarBackground': '#102526',
  },
});
