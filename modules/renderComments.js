import { comments } from "./comments.js";
import { initLikeListeners, initReplyListeners } from "./initListeners.js";

export const renderComments = () => {
    const container = document.querySelector('.container');
    
    const commentsHTML = comments.map((comment, index) => {
    return `
    <li class="comment" data-index="${index}">
        <div class="comment-header">
        <div class="comment-user-name">${comment.name}</div>
        <div class="comment-date">${comment.date.toLocaleDateString()}</div>
        </div>
        <div class="comment-body">
        <div class="comment-text">
            ${comment.text}
        </div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
        </div>
        </div>
    </li>
    `;
    }).join("");

    const addCommentsHtml = `
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          id="inputName"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
          id="inputComment"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="button">Написать</button>
        </div>
      </div>
      <div class="form-loading">
        Комментарий добавляется...
      </div>`

      const linkToLoginText = `<p>Чтобы отправить комментарий, <span class="link-login">войдите</span></p>`

      const baseHtml = `
      <ul class="comments">${commentsHTML}</ul>
      ${linkToLoginText}`

      container.innerHTML = baseHtml

    // initLikeListeners(renderComments);
    // initReplyListeners();
};