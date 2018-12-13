import axios from 'axios';

const Server = function (host) {
  self.host = host;
};

Server.prototype.login = function (login_info) {
  axios.post(`${self.host}/api-token-auth/`, {
    username: login_info.username,
    password: login_info.password
  })
      .then((res) => {
        window.sessionStorage.setItem('jwt-token', res.data.token);
        location.reload();
      })
      .catch((err) => {
        alert('계정 정보가 잘못 되었습니다.')
        console.log(err)
      })
};

Server.prototype.verifyToken = function (token) {
  return new Promise(function (resolve, reject) {
    axios.post(`${self.host}/api-token-verify/`, {token: token,})
        .then(res => resolve(res.data))
        .catch(err => {
          window.sessionStorage.removeItem('jwt-token')
          let loginForm = document.getElementById('login-form');
          loginForm.classList.remove('hidden');
          return reject(new Error(err+'토큰인증이 실패하였습니다'))
        })
  })
};

Server.prototype.makeLogin = function () {
  let loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let username = document.getElementById('login_id').value;
    let password = document.getElementById('login_password').value;
    Server.prototype.login({username, password})
  })
};

Server.prototype.getContent = function (token) {
  return new Promise(function (resolve, reject) {
    axios.get(`${self.host}/blog/api/`, {
      headers: {'Authorization': "JWT " + token}
    }).then(function (res) {
      return resolve(res.data);
    })
        .catch(function (err) {
          return reject(err);
        })
  })
};

Server.prototype.getComment = function (token, post_id) {
  return new Promise(function (resolve, reject) {
    axios.get(`${self.host}/comment/${post_id}`, {
      headers: {'Authorization': "JWT " + token}
    }).then(res => {
      return resolve(res.data)
    })
        .catch(err => {
          return reject(new Error(err + '코멘트를 가져오는데 실패했습니다.'))
        })
  })
};

export default Server