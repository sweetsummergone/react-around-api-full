export const BASE_URL = "http://localhost:3001";

const customFetch = ({ path, method, data }) => {
  return fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const register = (email, password) => {
  return customFetch({
    path: "/signup",
    method: "POST",
    data: { email, password },
  });
};

export const authorize = (email, password) => {
  return customFetch({
    path: "/signin",
    method: "POST",
    data: { email, password },
  }).then((data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    return data;
  });
};

export const logout = () => {
  localStorage.removeItem("jwt");
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
