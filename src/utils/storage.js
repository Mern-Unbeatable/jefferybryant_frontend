import { ROLES } from "@/constants/dummyUsers";

const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

const readUser = () => {
  const raw = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
  try {
    const user = raw ? JSON.parse(raw) : null;
    return ROLES.includes(user?.role) ? user : null;
  } catch {
    return null;
  }
};

export const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  getUser: readUser,
  setUser: (user, remember) =>
    (remember ? localStorage : sessionStorage).setItem(USER_KEY, JSON.stringify(user)),
  removeUser: () => {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};
