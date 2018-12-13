import AOS from 'aos'
import 'aos/dist/aos.css'
import './style.css'
import view from './view/view.js';
import Server from './view/server.js'

let host = 'http://10.0.1.13:8000';
let server = new Server(host);
let token = null;
token = window.sessionStorage.getItem('jwt-token');

AOS.init();

document.addEventListener('readystatechange', function () {
  if (token) {
    view.hideLoginForm();
  }
});

window.addEventListener('load', function () {
  if (token) {
    server.verifyToken(token).then(data => {
      //token 인증 성공
      let valid_token = data.token;
      let login_user = data.profile;
      //유저 정보 표시
      view.userInfo(login_user);
      //서버에 token 정보와 함께 get 요청
      server.getContent(valid_token)
          .then(res => {
            view.content(res)
            console.log(res)
            Array.from(res).forEach(data=>{
              server.getComment(valid_token, data.id)
                  .then(res=>{
                    view.comment(res, data.id)
                  })
            })
          })

    })
        .catch(err => {
          //token 인증 에러
          console.log(err.message)
        })

    let page = 2;
    window.onscroll = function(e){
      let clientRectBottom = document.documentElement.getBoundingClientRect().bottom
      let clientHeight = document.documentElement.clientHeight
      if(clientHeight+100 > clientRectBottom){
        server.getContent(token,page).then(res=>view.content(res))
        console.log('bottom')
        page +=1;
        console.log(page)
      }
      // if((window.scrollY + window.innerHeight)>document.body.offsetHeight){
      //   setTimeout(()=>console.log('showbottom'),1000)
      // }
    }

  }
  server.submitLogin();
})






