import axios from 'axios';
import view from './view';

const Server = function (data) {
  self.host= data.host;
  self.axios = axios.create({
    baseURL: data.host,
    headers: {
      'Authorization': "JWT "+data.token,
    },
  })
};

Server.prototype.login = function (login_info) {
  self.axios.post('/api-token-auth/', {
    username: login_info.username,
    password: login_info.password
  })
    .then((res) => {
      window.sessionStorage.setItem('jwt-token', res.data.token);
      document.cookie = `jwt-token=${res.data.token}`;
      location.reload();
    })
    .catch((err) => {
      alert('계정 정보가 잘못 되었습니다.');
      console.log(err)
    })
};

Server.prototype.sendCommentData = function(commentData){
  return new Promise((resolve,reject)=>{
    self.axios.post(`/comment/api/`,{
      data:{
        content: commentData.comment,
        post: commentData.post_id,
      },
    }).then(res=>{
      return resolve(res)
    })
  })
};

Server.prototype.verifyToken = function (token) {
  return new Promise(function (resolve, reject) {
    self.axios.post(`/api-token-verify/`, {token: token,})
      .then(res => resolve(res.data))
      .catch(err => {
        window.sessionStorage.removeItem('jwt-token');
        document.cookie = 'jwt-token=; Max-Age=-99999999;';
        let loginForm = document.getElementById('login-form');
        loginForm.classList.remove('hidden');
        return reject(new Error(err + ' 토큰인증이 실패하였습니다'))
      })
  })
};

Server.prototype.submitLogin = function () {
  let loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let username = document.getElementById('login_id').value;
    let password = document.getElementById('login_password').value;
    Server.prototype.login({username, password})
  })
};

Server.prototype.getContent = function (page) {
  return new Promise(function (resolve, reject) {
    self.axios.get(`/blog/api/`, {
      params: {
        page: page,
      }
    }).then(function (res) {
      let data = res.data;
      let status = res.status
      return resolve({data, status});
    })
      .catch(function (err) {
        return reject(err);
      })
  })
};


export default Server