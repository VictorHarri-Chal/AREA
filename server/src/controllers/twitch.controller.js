const axios = require('axios');

exports.twitchCallback = (req, res) => {
    const clientId = '24gzvb0o12bsdlj7qqe016eapnfisc';
    const clientSecret = 'ov2gyyrz0ei1wtf0vdhxn2kxw43keg';
    const redirectUri = 'http://localhost:8080/twitchcallback';
    const code = req.query.code

    axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
        },
    }).then ((response) => {
        console.log(response.data);
    }).catch ((error) => {
        console.log(error);
    })

    res.header("Access-Control-Allow-Origin", "*");
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8081/dashboard");
    res.end();
}

exports.twitchAuth = (req, res) => {

    res.redirect('https://id.twitch.tv/oauth2/authorize' +
        '?response_type=code' +
        '&client_id=' + '24gzvb0o12bsdlj7qqe016eapnfisc' +
        '&redirect_uri=' + 'http://localhost:8080/twitchcallback' +
        '&scope=' + 'moderator:manage:banned_users' +
        '&state=' + '9fusiuye96sab8bvhcx4xnd8wnig9r'
    )

}