import AOS from 'aos'
import 'aos/dist/aos.css'
import './style.css'
import view from './view/view.js';
import Server from './view/server.js'

const _ = require('lodash');

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
            let postArray = res.data;
            view.content(postArray)
            Array.from(postArray).forEach(post => {
              if (post.comment_count > 0) {
                server.getComment(valid_token, post.id)
                    .then(commentArray => {
                      view.comment(commentArray)
                    })
              }
            })
          })

    })
        .catch(err => {
          //token 인증 에러
          console.log(err.message)
        });


    let page = 2;
    let preventGetContent = false;

    window.addEventListener('scroll', _.throttle(function (e) {
      let clientRectBottom = document.documentElement.getBoundingClientRect().bottom;
      let clientHeight = document.documentElement.clientHeight;
      if (clientHeight + 100 > clientRectBottom) {
        if (!preventGetContent) {
          console.log('over!!!')
          server.getContent(token, page)
              .then(res => {
                if (res.status === 204) preventGetContent = true;
                else if (res.status === 200) {
                  view.content(res.data);
                  Array.from(res.data).forEach(post => {
                    if (post.comment_count > 0) {
                      server.getComment(token, post.id)
                          .then(commentArray => {
                            view.comment(commentArray)
                          })
                    }
                  });
                  page += 1;
                }
              });
          // console.log('bottom');
          // console.log(page)
        }
      }
    }, 500,{leading:true}))
  }
  server.submitLogin();
})




