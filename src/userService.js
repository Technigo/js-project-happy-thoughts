import { saveToken, getToken } from './auth';

const API_BASE = 'https://happy-thoughts-api-xvxs.onrender.com';

// login
export const login = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // <--- TILLAGT
    });
    const data = await res.json();
    if (res.ok) {
      saveToken(data.accessToken);
      return { success: true };
    } else {
      return { success: false, message: data.error };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// signup
export const signup = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // <--- TILLAGT
    });
    const data = await res.json();
    if (res.ok) {
      saveToken(data.accessToken);
      return { success: true };
    } else {
      return { success: false, message: data.error };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// logout
export const logout = () => {
  localStorage.removeItem('accessToken');
};

// get user info
export const getUserInfo = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${API_BASE}/users/me`, {
      headers: {
        Authorization: token,
      },
      credentials: 'include', // <--- TILLAGT
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
