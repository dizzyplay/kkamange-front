const view = {
  hideLoginForm: function () {
    let loginForm = document.getElementById('login-form')
    loginForm.classList.add('hidden')
  },
  content: function (data) {
    // data 는 Array
    let container = document.querySelector('.container');
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
      content.innerHTML = `<b>집사 : ${data.nickname}</b> <br> ${data.content} <br> 
            <span class="right"> - ${data.short_date}</span>`;
      main.classList.add("container");
      main.id = data.id;
      main.classList.add("container");
      main.appendChild(title);
      main.appendChild(img_content);
      main.appendChild(content);
      container.appendChild(main);
      main.dataset.aos = 'fade-up';
    })
  },
  userInfo: function (info) {
    let navbar = document.querySelector('.navbar')
    navbar.innerText = `${info.nickname} 님 환영합니다`;
  },
  comment: function (data, post_id) {
    //data 는 Array
    let container = document.getElementById(`${post_id}`);
    let commentBox = document.createElement('div');
    commentBox.classList.add('comment-box');
    container.appendChild(commentBox);
    let ul = document.createElement('ul');
    commentBox.appendChild(ul);
    Array.from(data).forEach(data => {
      let li = document.createElement('li');
      li.classList.add('comment-text');
      li.innerHTML = `<b>${data.nickname}</b><br> ${data.content} - ${data.short_date}`;
      ul.appendChild(li);
    })
  },
};


export default view;