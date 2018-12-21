const EventEmitter = require('events').EventEmitter;
const myEvent = new EventEmitter
const view = {
  hideLoginForm: function () {
    let loginForm = document.getElementById('login-form')
    loginForm.classList.add('hidden')
  },
  content: function (data) {
    // data 는 Array
    // container 는 메인 컨테이너
    let container = document.querySelector('.container');
    Array.from(data).forEach(data => {
      // main은 포스트 카드
      let main = document.createElement('div');
      let img_content = document.createElement('div');
      let content = document.createElement('div');

      img_content.classList.add("post-photo-content");
      img_content.innerHTML = `<img src=${host}${data.photo} width="100%"></div>`;
      content.classList.add("post-text-content");
      content.innerHTML = `
<div class="post-date"><span class="date-font">${data.short_date} - comment ${data.comment_count}</span></div>
<div class="post-content-divider">
<div class="post-content-divider-content">${data.content} </div>
<div class="post-content-divider-username">${data.nickname}</div>
</div>
`;
      main.classList.add("post-container");
      main.id = data.id;
      main.appendChild(img_content);
      main.appendChild(content);
      container.appendChild(main);
      main.dataset.aos = 'fade-up';
    })
  },
  userInfo: function (info) {
    let navbar = document.querySelector('.navbar');

    navbar.innerHTML = `<div class="navbar-content">${info.nickname} 님 환영합니다</div>
`;
  },
  comment: function ({commentArray, post_id}) {
    //data 는 Array
    let container = document.getElementById(post_id);
    let commentBox = document.createElement('div');
    commentBox.classList.add('comment-container');
    container.appendChild(commentBox);
    commentBox.id = `comment-box-${post_id}`;

    if (commentArray.length > 0) {
      Array.from(commentArray).forEach(comment => {
        let commentDiv = document.createElement('div');
        commentDiv.id = `comment-${comment.pk}`;
        commentDiv.classList.add('comment-column-box');
        commentDiv.innerHTML = `
          <div class="comment-between-box">
          <div class="comment-parent-content">
          <b>${comment.nickname}</b> <span class="date-font">${comment.short_date}</span></br>
          ${comment.content}
          </div>
          <div class="comment-parent-reply-button" id="reply-btn-for-comment-${comment.pk}">
          댓글달기
          </div>
          </divc>
        `;
        commentBox.appendChild(commentDiv);
        // 해당 코멘트에 코멘트가 달려있다면
        if (comment.children.length > 0) {
          Array.from(comment.children).forEach(c_comment => {
            let childDiv = document.createElement('div');
            childDiv.id = `comment-${c_comment.pk}`;
            childDiv.dataset.parent_id = `${c_comment.parent}`;
            childDiv.classList.add('comment-box');
            childDiv.innerHTML = `
              <div class="comment-child-content">
              <b>${c_comment.nickname}</b> <span class="date-font">${c_comment.short_date}</span></br>
              ${c_comment.content}
              </div>
              `;
            commentDiv.appendChild(childDiv)
          });
        }
        let rBtn = document.getElementById(`reply-btn-for-comment-${comment.pk}`);
        rBtn.addEventListener('click',()=>{
          console.log(`clicked ${comment.pk}`)
          let parentDiv = document.getElementById(`comment-${comment.pk}`)
          let toMakeForm = document.createElement('div')
          toMakeForm.classList.add('comment-form')
          toMakeForm.innerHTML = `
              <div class="comment-form-left">
              <textarea placeholder="댓글을 입력해주세요" class="comment-form-left" id="comment-text-id-${comment.pk}"></textarea>
            </div>
            <div class="comment-form-right">
              <div class="comment-form-right-circle-btn" id="comment-btn-${comment.pk}"><i class="fa fa-coffee"></i></div>
              </form>
      </div>
          `;
          parentDiv.appendChild(toMakeForm)
        })
      });
    }

    view.commentForm(post_id)
  },

  commentForm: function (post_id) {
    let targetDiv = document.getElementById(`comment-box-${post_id}`);
    let comment_form = document.createElement('div');
    comment_form.classList.add('comment-form');
    comment_form.innerHTML = `
      <div class="comment-form-left">
      <textarea placeholder="댓글을 입력해주세요" class="comment-form-left" id="comment-text-id-${post_id}"></textarea>
      </div>
      <div class="comment-form-right">
        <div class="comment-form-right-circle-btn" id="comment-btn-${post_id}"><i class="fa fa-coffee"></i></div>
        </form>
      </div>
      `;
    targetDiv.appendChild(comment_form);
    let cBtn = document.getElementById(`comment-btn-${post_id}`)
    cBtn.addEventListener('click',()=>{
      console.log('this is inside from comentform')
      let commentText = document.getElementById(`comment-text-id-${post_id}`);
      console.log(commentText.value)
      commentText.value ='';
    })
  },

  postForm: function () {
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
    postform.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('submit event')
    })
  }
};


export default view;