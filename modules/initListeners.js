import { comments } from "./comments.js";
import { sanitize } from "./sanitize.js";

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (e) => {
            e.stopPropagation();

            const index = likeButton.dataset.index;
            const comment = comments[index];

            comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;

            comment.isLiked = !comment.isLiked;

            renderComments();
        });
    }
}

export const initReplyListeners = () => {
    const inputCommentEl = document.getElementById('inputComment');
    const commentElements = document.querySelectorAll(".comment");

    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            const currentComment = comments[commentElement.dataset.index];
            inputCommentEl.value = `${currentComment.name}: ${currentComment.text} >`;
        });
    }
}

export const initAddListener = (renderComments) => {
    const inputNameEl = document.getElementById('inputName');
    const inputCommentEl = document.getElementById('inputComment');
    const buttonEl = document.getElementById('button');

    buttonEl.addEventListener('click', () => {

        if (!inputNameEl.value || !inputCommentEl.value) {
        alert("Заполните форму");
        return;
        }

        const newComment = {
        name: sanitize(inputNameEl.value),
        date: new Date(),
        text: sanitize(inputCommentEl.value),
        likes: 0,
        isLiked: false,
        };

        comments.push(newComment);

        renderComments();

        inputNameEl.value = "";
        inputCommentEl.value = "";
    });
}