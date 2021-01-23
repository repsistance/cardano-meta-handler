const cardanoMetaHandler = require('./lib/index.js')
const fs = require('fs')

customHeaders = { 'Content-Type': 'application/pgp-signature' }
cardanoMetaHandler.default.buildHTTPMetadataFromURI("file:///var/tmp/keybase-signed.pgp", customHeaders, true).then(response => {
    console.log(response)
    // output
    fs.writeFileSync("/var/tmp/built-http-response.json", JSON.stringify(response))
})
