import { API } from "../backend";

export const register = (userId, token, product) => {
    return fetch(`${API}/getRegister/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getRegister = (userId, token,) => {
    return fetch(`${API}/Myregister/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
