import AOS from 'aos'
import 'aos/dist/aos.css'
import './style.css'

const axios = require('axios');


AOS.init();
const host = "http://localhost:8000";

window.onload = function () {
  axios.get(`${host}/blog/api/`)
      .then(function (res) {
        let data = res.data
        let container = document.querySelector('.container')
        Array.from(data).forEach(data => {
          let main = document.createElement('div');
          let title = document.createElement('div');
          let img_content = document.createElement('div');
          let content = document.createElement('div');
          title.classList.add("divTop");
          title.innerHTML = `<h1> ${data.title} </h1>`;
          img_content.classList.add("divOutside");
          img_content.innerHTML = `<img src=${host}${data.photo} width="400"></div>`;
          content.classList.add("divBottom");
          content.innerHTML = `<b>집사 : ${data.nickname}</b> <br> ${data.content} `;
          main.classList.add("container");
          main.id = data.id;
          main.classList.add("container");
          main.appendChild(title);
          main.appendChild(img_content);
          main.appendChild(content);
          container.appendChild(main);
          main.dataset.aos = 'fade-up';
          if(data.comment_count) commentView(data.id);
        })
      })
};

let commentView = function (post_id) {
  axios.get(`${host}/comment/${post_id}`)
      .then(function (res) {
        let data= res.data;
        let container = document.getElementById(`${post_id}`);
        let commentBox = document.createElement('div');
        commentBox.classList.add("comment-box")
        let ul = document.createElement('ul');
        container.appendChild(commentBox);
        commentBox.appendChild(ul);
        Array.from(data).forEach(data =>{
          let li = document.createElement('li');
          li.classList.add("comment-text");
          li.innerHTML = `<b>${data.nickname}</b><br>${data.content}   - ${data.short_date}`;
          ul.appendChild(li);
        })
      })
}

