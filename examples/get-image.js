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
txid = "87550b4ec41a8841f22b2916c3796401633da7f2ec5a9a159771cf2e12d6fbb4"
uri = `metadata+cardano://${txid}?network=testnet&key=104116116112&type=http-response`
cardanoMetaHandler.default.get(uri).then(response => {
    console.log(JSON.stringify(response))
})
