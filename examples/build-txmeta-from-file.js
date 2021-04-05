const cardanoMetaHandler = require('./lib/index.js')
const fs = require('fs')

customHeaders = { 'Content-Type': 'image/jpeg' }
cardanoMetaHandler.default.buildHTTPMetadataFromURI("file:///var/tmp/chewbacca.jpg", customHeaders, false).then(response => {
    console.log(response)
    // output
    fs.writeFileSync("/var/tmp/built-http-response.json", JSON.stringify(response))
})
