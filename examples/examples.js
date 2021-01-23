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
// get tx as it is on-chain
cardanoMetaHandler.default.get("metadata+cardano://9cc0ffdc5665a5c0f48b45692f273b5b982315e2ba194ee0beb507c0a13724a2?network=testnet&key=42&").then(response => {
    console.log(response)
})
// get tx in http-fashion
cardanoMetaHandler.default.get("metadata+cardano://9cc0ffdc5665a5c0f48b45692f273b5b982315e2ba194ee0beb507c0a13724a2?network=testnet&key=42&type=http-response").then(response => {
    console.log(response)
})

/* Currently if no customHeaders are passed, response.headers['Content-Type']
   is the only header set from axios obj. 
*/
customHeaders = { 'Content-Type': 'application/ld+json' }
cardanoMetaHandler.default.buildHTTPMetadataFromURI("https://raw.githubusercontent.com/bio-tools/content.jsonld/master/3D-ADA/3D-ADA.jsonld", customHeaders, true).then(response => {
    console.log(response)
    fs.writeFileSync("/var/tmp/built-http-response.json", JSON.stringify(response))
})

// tx sample: https://explorer.cardano-testnet.iohkdev.io/en/transaction.html?id=2065e342de1748dd69788f71e7816b61b0e93da942a87a5a334d6a9a3defdc2a
customHeaders = { 'Content-Type': 'application/pgp-signature' }
cardanoMetaHandler.default.buildHTTPMetadataFromURI("file:///var/tmp/keybase-signed.pgp", customHeaders, true).then(response => {
    console.log(response)
    fs.writeFileSync("/var/tmp/built-http-response.json", JSON.stringify(response))
})
