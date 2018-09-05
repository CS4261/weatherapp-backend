var express = require('express');
var router = express.Router();
var axios = require('axios');

const place_url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
const place_id_url = "https://maps.googleapis.com/maps/api/place/details/json"
const api_key = "AIzaSyARfebL1k9xzuE7OBIxiFVdwGYH_I6u8YE"
var CancelToken = axios.CancelToken;
var cancel = null;
/* GET home page. */
router.get('/location/:name', async function (req, res, next) {
    try {
        const data = await getLocation(req.params.name);
        res.send(data);
    } catch (e) {
        console.log(e)
    }
});


module.exports = router;
