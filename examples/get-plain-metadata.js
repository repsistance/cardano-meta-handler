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
uri = "metadata+cardano://2065e342de1748dd69788f71e7816b61b0e93da942a87a5a334d6a9a3defdc2a?network=testnet&key=104116116112"
cardanoMetaHandler.default.get(uri).then(response => {
    console.log(JSON.stringify(response))
})
