const cardanoMetaHandler = require('./lib/index.js')
const fs = require('fs')

/* If no 'type' parameter is passed, plain metadata is returned
   Currently only type supported is 'http-response', which will return an
   axios response object for the URL with status code set based on minimal
   checks:
   - 200 for OK
   - 204 for empty response.data value 
   - 500 if no headers present (assuming it's not an actual http-response metadata obj)
*/
uri = "metadata+cardano://9cc0ffdc5665a5c0f48b45692f273b5b982315e2ba194ee0beb507c0a13724a2?network=testnet&key=42&type=http-response"
cardanoMetaHandler.default.get(uri).then(response => {
    console.log(JSON.stringify(response))
})
