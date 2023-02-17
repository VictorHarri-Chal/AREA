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

exports.parseJwt = (jwtToken) => {
    return JSON.parse(Buffer.from(jwtToken.split('.')[1], 'base64').toString());
}