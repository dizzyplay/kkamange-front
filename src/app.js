import AOS from 'aos'
import 'aos/dist/aos.css'
import view from './components/view.js';
import Server from './components/server.js';
import Token from './components/token.js';

import './styles.scss'

const _ = require('lodash');

let host = 'http://10.0.1.13:8000';
let token = null;
token = Token.getFromBrowser();
let server = new Server({host, token});

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
      let login_user = data.profile;
      //유저 정보 표시
      view.userInfo(login_user);
      //서버에 token 정보와 함께 get 요청
      procContent()
    })
      .catch(err => {
        //token 인증 에러
        console.log(err.message)
      });

    // 글쓰기 버튼
    let postBtn = document.querySelector('.postBtn');
    let postFormVisible = false;
    postBtn.addEventListener('click', function () {
      console.log('button')
      if (!postFormVisible) {
        postFormVisible = !postFormVisible;
        view.postForm()
      }
    })

    let page = 2;
    let preventGetContent = false;

    window.addEventListener('scroll', _.throttle(function (e) {
      let clientRectBottom = document.documentElement.getBoundingClientRect().bottom;
      let clientHeight = document.documentElement.clientHeight;
      if (clientHeight + 100 > clientRectBottom) {
        if (!preventGetContent) {
          procContent(page).then(res => page = res + 1).catch(err => {
            preventGetContent = true
          })
        }
      }
    }, 500, {leading: true}))
  }
  //토큰 인증 실패시
  server.submitLogin();
});

function procContent(page) {
  return new Promise((resolve, reject) => {
    server.getContent(page)
      .then(res => {
        if (res.status === 204) {
          console.log('end of page')
          return reject(false)
        } else if (res.status === 200) {
          view.content(res.data);
          Array.from(res.data).forEach(post => {
            let data = {
              commentArray: post.comments,
              post_id: post.id
            }
            view.comment(data)
          });
          return resolve(page)
        }
      })
  })
}




