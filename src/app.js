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
      let userinfo = data.profile;
      //유저 정보 표시
      view.userInfo(userinfo);
      //서버에 token 정보와 함께 get 요청
      server.getContent(valid_token)
          .then(contentData => {
            //게시글 뷰
            view.content(contentData);

            // 코멘트 뷰
            contentData.forEach(contentData =>{
              if(contentData.comment_count > 0){
                server.getComment(valid_token, contentData.id)
                    .then(commentData=>view.comment(commentData, contentData.id))
              }
            })
          })
    })
        .catch(err => {
          //token 인증 에러
          console.log(err.message)
        })
    // server.getContent(token).then(res=>view.content(res.data)).catch(err=>console.log(err));
  }
  server.makeLogin();
})






