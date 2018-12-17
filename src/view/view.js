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
      title.innerHTML = `<h1> ${data.title} </h1> `;
      img_content.classList.add("divOutside");
      img_content.innerHTML = `<img src=${host}${data.photo} width="400"></div>`;
      content.classList.add("divBottom");
      content.innerHTML = `<b>집사 : ${data.nickname}</b> <br> ${data.content} <br> 
            <span class="right"> - ${data.short_date} / 댓글개수 - ${data.comment_count}</span>`;
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
  comment: function (commentArray) {
    //data 는 Array
    console.log('코멘트 그릴 포스트 아이디 값 ' + commentArray[0].post)
    let container = document.getElementById(`${commentArray[0].post}`);
    let commentBox = document.createElement('div');
    commentBox.classList.add('comment-box');
    container.appendChild(commentBox);
    let ul = document.createElement('ul');
    commentBox.appendChild(ul);
    Array.from(commentArray).forEach(comment => {
      let li = document.createElement('li');
      li.id = `comment-${comment.pk}`;
      li.classList.add('comment-text');
      li.innerHTML = `<b>${comment.nickname}</b><br> ${comment.content} - ${comment.short_date}`;

      // 해당 코멘트에 코멘트가 달려있다면
      if(comment.children.length > 0) {
        let child_ul = document.createElement('ul');
        Array.from(comment.children).forEach(c_comment =>{
          let child_li = document.createElement('li');
          child_li.innerText = `[${c_comment.nickname}] - ${c_comment.content} - ${c_comment.short_date}`;
          child_ul.appendChild(child_li)
        });
        li.appendChild(child_ul)
      }

      ul.appendChild(li);
    })
  },
  postForm: function(){
    let menuDiv = document.querySelector('.menuContainer');

    let postDiv = document.createElement('div');
    postDiv.innerHTML = `
      <form class="postForm" id="postformid">
        <input type="text">
        <textarea></textarea>
        <input type="file">
        <input type="submit">
  </form>
    `;
    menuDiv.appendChild(postDiv)
    let postform = document.getElementById('postformid')
    postform.addEventListener('submit',function(e){
      e.preventDefault();
      console.log('submit event')
    })
  }
};


export default view;