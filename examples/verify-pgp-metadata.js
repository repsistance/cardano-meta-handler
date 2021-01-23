const httpOverCardano = require('./lib/index.js')
const fs = require('fs')
const openpgp = require('openpgp')
const axios = require('axios')

const cardanoMetaURI = 'metadata+cardano://2065e342de1748dd69788f71e7816b61b0e93da942a87a5a334d6a9a3defdc2a?network=testnet&key=104116116112&type=http-response'
const publicKeyURI = 'https://keybase.io/rcmorano/pgp_keys.asc' 

async function getAndVerifyMetadata() {

  publicKeyArmored = await axios.get(publicKeyURI)
  
  metadata = await httpOverCardano.default.get(cardanoMetaURI)

  const verified = await openpgp.verify({
      message: await openpgp.cleartext.readArmored(metadata.data), // parse armored message
      publicKeys: (await openpgp.key.readArmored(publicKeyArmored.data)).keys // for verification
  })
  const { valid } = verified.signatures[0];
  if (valid) {
      console.log('Document signature validated for key id ' + verified.signatures[0].keyid.toHex())
      console.log(verified.data)
  } else {
      throw new Error('signature could not be verified');
  }
}

getAndVerifyMetadata()
