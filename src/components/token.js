const token = {
  getFromBrowser: function () {
    let token = null;
    token = window.sessionStorage.getItem('jwt-token');
    if (!token) {
      let ca = document.cookie.split(';');
      Array.from(ca).forEach(cookie => {
        let token_exist = /jwt-token/g.test(cookie);
        if (token_exist) {
          let tokenArray = cookie.split('=');
          token = tokenArray[1];
        }
      })
    }
    return token
  }
};

export default token;