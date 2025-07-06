import { postComment } from "./api.js"
import { comments, updateComments } from "./comments.js"
import { sanitize } from "./sanitize.js"

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll(".like-button")

    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (e) => {
            e.stopPropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1

            comment.isLiked = !comment.isLiked;

            renderComments();
        })
    }
}

export const initReplyListeners = () => {
    const inputCommentEl = document.getElementById('inputComment')
    const commentElements = document.querySelectorAll(".comment")

    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            const currentComment = comments[commentElement.dataset.index]
            inputCommentEl.value = `${currentComment.name}: ${currentComment.text} >`
        });
    }
}

export const initAddListener = (renderComments) => {
    const inputNameEl = document.getElementById('inputName')
    const inputCommentEl = document.getElementById('inputComment')
    const buttonEl = document.getElementById('button')

    buttonEl.addEventListener('click', () => {

        if (!inputNameEl.value.trim() || !inputCommentEl.value.trim()) {
            alert("Заполните форму")
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(sanitize(inputCommentEl.value), sanitize(inputNameEl.value)).then((data) => {

            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            updateComments(data)
            renderComments()
            inputNameEl.value = ""
            inputCommentEl.value = ""
        })
    })
}