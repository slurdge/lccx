const axios = require("axios");

module.exports = (req, res) => {
    const { number = 1 } = req.query
    axios
        .get("https://type.fit/api/quotes")
        .then((response) => {
            res.send(response.data[number]);
        });
};