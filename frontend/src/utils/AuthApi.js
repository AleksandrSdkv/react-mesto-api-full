export const BASE_URL = 'http://localhost:3000';
const apiRequest = ({
    url,
    method = 'POST',
    token,
    data,
}) => {
    return fetch(`${BASE_URL}${url}`, {

        method,
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
            ...!!token && { 'Authorization': `Bearer ${token}` }
        },

        ...!!data && { body: JSON.stringify(data) }
    })

        .then((res) => {
            if (!res.ok) return Promise.reject(`Упс, что-то пошло не так ${res.status}!!!`);
            return res.json();
        });
}

export const register = (password, email) => {
    return apiRequest({
        url: '/signup',
        data: { password, email }
    });
};
export const login = (password, email) => {
    return apiRequest({
        url: '/signin',
        data: { password, email }
    })
}
export const checkTokenValid = (token) => {

    return apiRequest({
        token,
        url: '/users/me',
        method: 'GET',
    })
}