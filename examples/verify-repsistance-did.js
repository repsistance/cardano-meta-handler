const httpOverCardano = require('./lib/index.js')
const fs = require('fs')
const openpgp = require('openpgp')
const axios = require('axios')

// proof of existance object (json-ld file containing references to some other signed proofs and wallet addresses)
const cardanoMetaURI = 'metadata+cardano://984af97633c235af4a1aabf7adb4ea39cda9198a46e132050f4868eb93bf81bc?network=testnet&key=104116116112&type=http-response'
// self-signed pubkey (json-ld with GpgSignature2020 schema/context)
const publicKeyURI = 'metadata+cardano://2ecd9506472a5cc91687a62f6921f1d760863300ed54c6b0223e6b2b7a47576c?network=testnet&key=104116116112&type=http-response' 

async function getAndVerifyMetadata(publicKeyFile, metadataURI) {

  const armoredMessage = await fs.readFileSync(publicKeyFile).toString();

  const metadata = await httpOverCardano.default.get(metadataURI);
  const verified = await openpgp.verify({
      message: await openpgp.cleartext.readArmored(metadata.data), // parse armored message
      publicKeys: (await openpgp.key.readArmored(armoredMessage)).keys // for verification
  })

  const { valid } = verified.signatures[0];
  if (valid) {
      console.log('Document signature validated for key id ' + verified.signatures[0].keyid.toHex())
      //console.log(verified.data)
  } else {
      throw new Error('signature could not be verified');
  }
}

async function savePublicKey(publicKeyURI) {

  const publicKeyArmored = await httpOverCardano.default.get(publicKeyURI)
  const proof = await openpgp.verify({
      message: await openpgp.cleartext.readArmored(publicKeyArmored.data), // parse armored message
      publicKeys: (await openpgp.key.readArmored(publicKeyArmored.data)).keys // for verification
  });

  var parsedData = JSON.parse(proof.data);
  
  publicKeyFile = "/tmp/"+parsedData.id
  fs.writeFileSync(publicKeyFile, parsedData.publicKeyGpg);

  return publicKeyFile;
}

async function execute() {

  var publicKeyFile = await savePublicKey(publicKeyURI);

  //// verify pubkey metadata was signed with the corresponding privkey
  await getAndVerifyMetadata(publicKeyFile, publicKeyURI)
  //// now we can verify any further message published from that identity on chain, like the claimed proofs:
  await getAndVerifyMetadata(publicKeyFile, cardanoMetaURI)
}

execute();
