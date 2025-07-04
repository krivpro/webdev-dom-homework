import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { initAddListener } from './modules/initListeners.js'
import { renderComments } from './modules/renderComments.js'

fetchComments().then(data => {
    updateComments(data)
    renderComments()
});

initAddListener(renderComments)