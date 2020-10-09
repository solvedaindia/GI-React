const storage = {
  set: (name, value, timeInMs) => {
    let expiryLimit = new Date().getTime();
    if (timeInMs) {
      expiryLimit = new Date().getTime() + timeInMs;
    }
    localStorage.setItem(
      name,
      JSON.stringify({
        value,
        expires: expiryLimit,
      }),
    );
  },
  validateGet: name => {
    if (name) {
      const data = JSON.parse(localStorage.getItem(name));
      return data && data.value && data.expires > new Date().getTime()
        ? data.value
        : null;
    }
    return null;
  },
  get: name => {
    if (name) {
      const data = JSON.parse(localStorage.getItem(name));
      return data && data.value ? data.value : null;
    }
    return null;
  }
};

export default storage;
