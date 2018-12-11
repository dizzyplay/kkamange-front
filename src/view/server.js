import axios from 'axios';

const Server = function(host){
 self.host = host;
};

Server.prototype.login= function(login_info){
  axios.post(`${self.host}/api-token-auth/`,{
    username: login_info.username,
    password: login_info.password
  })
      .then((res)=>{
        window.sessionStorage.setItem('jwt-token',res.data.token);
        location.reload();
      })
      .catch((err)=>{
        alert('계정 정보가 잘못 되었습니다.')
        console.log(err)
      })
};

Server.prototype.verifyToken = function(token){
  axios.post(`${self.host}/api-token-verify/`,{
    token: token
  })
      .then((res)=>{
        let navbar = document.querySelector('.navbar')
        navbar.innerText = `${res.data.profile.nickname} 님 환영합니다`;
      })
};

Server.prototype.makeLogin = function(){
  let loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit',function(e){
    e.preventDefault();
    let username =  document.getElementById('login_id').value;
    let password = document.getElementById('login_password').value;
    Server.prototype.login({username,password})
  })
}

export default Server