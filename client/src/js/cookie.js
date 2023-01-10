export const setCookie = (name, value, days) => {

  const obj = JSON.stringify(value);

  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${obj || ''}${expires}; Path=/; SameSite=Strict;`;
};

export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return JSON.parse(c.substring(nameEQ.length, c.length));
    }
  }
  return undefined;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
