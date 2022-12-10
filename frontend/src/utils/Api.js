class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;

    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    getUserData() {
        return fetch(`${this._url}/users/me`, { headers: this._headers })
            .then(this._getResponseData)
    }
    getUserCards() {
        return fetch(`${this._url}/cards`, { headers: this._headers })
            .then(this._getResponseData)
    }
    setUserData(data) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._getResponseData)
    }
    setAvatarData(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._getResponseData)
    }
    pushNewCard(data) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._getResponseData)

    }
    setToken(token) {
        this._headers.Authorization = `Bearer ${token}`
    }
    deleteCard(cardID) {
        return fetch(`http://localhost:3000/cards/${cardID}`, {
            headers: this._headers,
            method: 'DELETE',
        }).then(this._getResponseData)
    }

    changeLikeCardStatus(cardID, isLiked) {
        if (isLiked) {
            return fetch(`http://localhost:3000/cards/${cardID}/likes`, {
                headers: this._headers,
                method: 'PUT',
            })
                .then(this._getResponseData)
        } else {
            return fetch(`http://localhost:3000/cards/${cardID}/likes`, {
                headers: this._headers,
                method: 'DELETE',
            })
                .then(this._getResponseData)
        }
    }
}
const apiConfig = {
    url: "http://localhost:3000",
    headers: {
        "content-type": "application/json",
        "Authorization": "",
    }
};
export const api = new Api(apiConfig);
