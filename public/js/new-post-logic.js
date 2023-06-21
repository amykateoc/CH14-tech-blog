const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const body = document.querySelector('#postContent').value.trim();

    if (title && body) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Something went wrong!');
        }
    }
};

document.querySelector('#newPostForm').addEventListener('submit', postFormHandler)