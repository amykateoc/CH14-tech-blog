const commentForm = document.querySelector('#comment-form');
const commentInput = document.querySelector('#comment-input');
const commentList = document.querySelector('#comment-list');
const post_id = window.location.pathname.split("/").pop();

commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = commentInput.value;

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ text, post_id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const comment = await response.json();
        commentList.insertAdjacentHTML('beforeend', `<li class="list-group-item list-item" data-id="${comment.id}"><button class="delete-gift delete-btn delete is-large"></button> ${comment.text} </li>`);
        commentInput.value = '';
    }
});

commentList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-comment')) {
        event.preventDefault();

        const button = event.target;
        const li = button.parentNode;
        const commentId = li.getAttribute('data-id');

        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                li.remove();
            } else {
                console.log('Failed to delete comment');
            }
        } catch (err) {
            console.log(err);
            alert('Failed to delete comment');
        }
    }
});

