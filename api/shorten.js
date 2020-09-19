const axios = require("axios");

console.log(process.env)

const {
    API_KEY: apikey,
} = process.env;


module.exports = (req, res) => {

    let { url = "https://www.google.com", note = "" } = req.query;

    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    var data = JSON.stringify({ "destination": url, "domain": "00000000-0000-0000-0000-000000000000", "note": note });

    var config = {
        method: 'post',
        url: 'https://api.lc.cx/v1/shorten',
        headers: {
            'Content-Type': 'application/json',
            'apikey': apikey
        },
        data: data
    };

    axios.request(config)
        .then(function(response) {
            res.send(response.data['shorturl']);
        })
        .catch(function(error) {
            res.send(error);
        });
};