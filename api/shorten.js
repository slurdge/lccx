const axios = require("axios");

console.log(process.env)

const {
    API_KEY: apikey,
} = process.env;


module.exports = (req, res) => {

    let { url = "", custom = "", note = "" } = req.body;

    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    var data = JSON.stringify({ "destination": url, "domain": "00000000-0000-0000-0000-000000000000", "note": note, "custom_path": custom });

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
            res.json({
                success: true,
                shorturl: response.data.shorturl
            });
        })
        .catch(function(error) {
            res.json({ success: false, message: error.response.data.message });
        });
};