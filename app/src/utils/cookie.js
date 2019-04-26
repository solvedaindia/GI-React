const cookie = {
  /**
   *
   */
  set(name, value, timeInMs) {
    let expires = '';
    const cookieDomain = 'path=/';

    if (timeInMs) {
      const date = new Date();
      date.setTime(date.getTime() + timeInMs);
      expires = `; expires=${date.toGMTString()}`;
    }

    document.cookie = `${name}=${value}${expires};${cookieDomain}`;
  },

  /*
     * Get cookie from user machine
     * Accept one parameters name
     *      name : name of the cookie
     */
  get(name) {
    const nameEQ = `${name}=`;
    let i;
    const ca = document.cookie.split(';');

    for (i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },

  /*
     * Erase or delete cookie from user machine
     * Accept one parameters name
     *      name : name of the cookie
     */
  delete(name, value = 0, domain) {
    this.set(name, value, -9999, domain);
  },
};

export default cookie;
