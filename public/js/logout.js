// refer to Module 14 Activity 17
const logout = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to log out.')
    }
};

document.querySelector('#logout').addEventListener('click', logout);