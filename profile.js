// profile.js

const API_URL = 'http://localhost:5000';  // Backend server URL
const profileInfo = document.getElementById('profile-info');
const logoutBtn = document.getElementById('logout-btn');

// Check for token in localStorage
const token = localStorage.getItem('token');

if (!token) {
  // If no token, redirect to login
  window.location.href = 'index.html';
}

// Fetch user profile data
async function getProfile() {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      profileInfo.innerHTML = `
        <p>Username: ${data.username}</p>
        <p>Email: ${data.email}</p>
      `;
    } else {
      profileInfo.innerHTML = `<p>Error: ${data.message}</p>`;
    }
  } catch (err) {
    profileInfo.innerHTML = `<p>Error: Could not connect to server.</p>`;
  }
}

// Logout function
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

getProfile();
