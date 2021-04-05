const cardanoMetaHandler = require('./lib/index.js')
const fs = require('fs')
const btoa = require('btoa')

/* If no 'type' parameter is passed, plain metadata is returned
   Currently only type supported is 'http-response', which will return an
   axios response object for the URL with status code set based on minimal
   checks:
   - 200 for OK
   - 204 for empty response.data value 
   - 500 if no headers present (assuming it's not an actual http-response metadata obj)
*/
uri = "metadata+cardano://2f79d932a1ab9084909a658c648a6efd419008677355e8fb8a50dd8de85c14b7?network=testnet&key=104116116112&type=http-response"
cardanoMetaHandler.default.get(uri).then(response => {
    console.log(JSON.stringify(response))
})
