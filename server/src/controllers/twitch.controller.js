const axios = require('axios');

exports.twitchCallback() = (req, res) => {
    console.log(req.query.code);
}

exports.twitchAuth() = (req, res) => {

    res.redirect('https://id.twitch.tv/oauth2/authorize' +
        '?response_type=code' +
        '&client_id=' + '24gzvb0o12bsdlj7qqe016eapnfisc' +
        '&redirect_uri=' + 'http://localhost:8080/twitchcallback' +
        '&scope=' + 'user:read:email' +
        '&state=' + '9fusiuye96sab8bvhcx4xnd8wnig9r'
    )

}