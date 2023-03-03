const jwtDecode = require('jwt-decode');

exports.getCookie = (name) => {

    let cookie = {};

    document.cookie.split(';').forEach(function(tok) {
        let [key,value] = tok.split('=');
        cookie[key.trim()] = value;
    })
    if (cookie[name])
        return cookie[name]
    else
        return ''
}

exports.parseJwt = (token) => {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);

    return parsedPayload.userID
}