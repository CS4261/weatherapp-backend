var express = require('express');
var router = express.Router();
var axios = require('axios');

const place_url = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const api_key = "AIzaSyARfebL1k9xzuE7OBIxiFVdwGYH_I6u8YE";
var CancelToken = axios.CancelToken;
var cancel = null;

/* GET home page. */
router.get('/location/:name', (req, res, next) => returnResult(req, res));

async function returnResult(request, response) {
    try {
        const data = await getLocation(request.params.name);
        response.send(data);
        
        
        const Clarifai = require('clarifai');
        
        const app = new Clarifai.App({
         apiKey: '75bfde3e8f4845a0af42f55ff1bd9e76'
        });
        
        app.models.predict(Clarifai.GENERAL_MODEL, "https://samples.clarifai.com/metro-north.jpg").then(
		  function(response) {
		    // do something with response
			  
			  console.log("SUCCEED");
			  console.log(response.outputs[0].data.concepts[0].name);
			  
		  },
		  function(err) {
		    // there was an error
			  console.log("FAIL");
			  console.log(err);
		  }
        	);
        
        
        console.log("Yes, succeeded.");
    } catch (e) {
        console.log(e);
        console.log("No, error.");
    }
}

async function getLocation(key) {
    try {
        const res = await axios.get(place_url, {
            params: {
                input: key,
                key: api_key
            },
            cancelToken: new CancelToken(function executor(c) {
                if (cancel !== null) {
                    cancel()
                }
                cancel = c;
            })
        })
        return res.data
    } catch (e) {
        throw e.response
    }
}

module.exports = router;
