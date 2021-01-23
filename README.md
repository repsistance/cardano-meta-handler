# Introduction

This a PoC for encapsulating HTTP responses on Cardano chain that can be retrieved via cardano-graphql using custom `cardano+metadata://$TX_ID?network=$NETWORK&key=$METADATUM_LABEL&type=http-response`

I currently have tested using nodejs, but should build and work on browsers :shrug:

# Build

```
npm run build
```

# Run by examples

```
# get tx metadata as it is on-chain (gzip+base64)
node examples/get-plain-metadata.js

# aplication/pgp-signature example
node examples/get-http-response-metadata.js | jq . 

# aplication/ld+json example
node examples/get-http-response-metadata2.js | jq .

# verify rcmorano's 3D-ADA json-ld response from Cardano chain
node examples/verify-pgp-metadata.js

# build txmetadata object from file:/// uri
node examples/build-txmeta-from-file.js

# build tx metadata object from https:// uri
node examples/build-txmeta-from-weburl.js
```

Check [examples/examples.js] for some comments. 
