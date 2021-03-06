import axios from 'axios'
import pako from 'pako'
import parseUri from 'parse-uri'
import atob from 'atob'
import btoa from 'btoa'
import fs from 'fs'
import mime from 'mime-types'

const HTTP_RESPONSE_METADATUM = 104116116112
var MockAdapter = require("axios-mock-adapter")
var grapqhlEndpoint = ''

function getGraphqlUrl(network) {
    return `https://graphql-api.${network}.dandelion.link/`
}

export async function buildHTTPMetadataFromURI(uri, customHeaders, compressed) {

  function chunkArray(arr, size) {
    var myArray = []
    for(var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i+size))
    }
    return myArray
  }

  const parsedUri = parseUri(uri)
  var response
  var b64data = ''
  var metadataObj = {}
  var headers = {}
  if ( customHeaders ) {
    headers = customHeaders
  }
 
  switch (parsedUri.protocol) {
    case 'file':
      response = { headers: headers, data: fs.readFileSync(parsedUri.path, 'utf-8') }
      if ( ! headers['Content-Type'] ) {
        headers['Content-Type'] = mime.lookup(parsedUri.path)
      }
      break
    default:
      response = await axios.get(uri)
      if ( ! headers['Content-Type'] ) {
        headers['Content-Type'] = response.headers['content-type']
      }
  }
 
  metadataObj[HTTP_RESPONSE_METADATUM] = {}
  headers['Content-Transfer-Encoding'] = "base64"

  if ( compressed ) {
    headers['Content-Encoding'] = "gzip"
    var binData = pako.gzip(JSON.stringify(response.data))
    var strData = String.fromCharCode.apply(null, new Uint16Array(binData))
    b64data = chunkArray(btoa(strData), 64)
  } else {
    b64data = chunkArray(response.data, 64)
  }

  metadataObj[HTTP_RESPONSE_METADATUM] = { headers: headers, response: { data: b64data } }
  return metadataObj
}

export async function getMetadataFromTxId(txId, metadataKey, grapqhlEndpoint) {
  var graphqlQuery = `{ transactions( where: { hash: { _eq: "${txId}" }, metadata: { key: { _eq: "${metadataKey}" } } } ) { metadata { value } } }`
  const response = await axios.post(grapqhlEndpoint, { query: graphqlQuery })
  return response.data.data.transactions[0].metadata[0].value
}

export async function get(uri) {

  const parsedUri = parseUri(uri)
  if ( parsedUri.queryKey['graphql'] ) { 
    grapqhlEndpoint = parsedUri.queryKey['graphql']
  } else {
    if ( parsedUri.queryKey['network'] ) {
      grapqhlEndpoint = getGraphqlUrl(parsedUri.queryKey['network'])
    }
  }

  var metadata
  switch (parsedUri.protocol) {
    case 'file':
      metadata = JSON.parse(fs.readFileSync(parsedUri.path, 'utf-8'))[HTTP_RESPONSE_METADATUM]
      break
    default:
      metadata = await getMetadataFromTxId(parsedUri.authority, parsedUri.queryKey.key, grapqhlEndpoint)
  }

  switch (parsedUri.queryKey['type']) {
    case 'http-response':
      var mock = new MockAdapter(axios)
      var strData
      var responseData
      var mockedResponse
      var response
      const jointData = metadata.response.data.join('')
      if ( ! metadata.headers ) {
          response = [500]
      } else {
        if ( metadata.headers['Content-Transfer-Encoding'] == "base64" ) {
          strData = atob(jointData)
        } else {
          strData = jointData
        }
  
        if ( metadata.headers['Content-Encoding'] == "gzip" ) {
          var charData = strData.split('').map(function(x){return x.charCodeAt(0);})
          var binData  = new Uint8Array(charData)
          var inflatedData = pako.inflate(binData)
          responseData = String.fromCharCode.apply(null, new Uint16Array(inflatedData))
        } else {
          responseData = strData
        }
  
        if ( responseData ) {
          response = [200, responseData, metadata.headers]
        } else {
          response = [204, "", metadata.headers]
        }

        mock.onGet(uri).reply(function() {
          return response
        })

        var axiosResponse = await axios.get(uri)

        mock.restore()

        return axiosResponse
      }
      break
    default:
      return metadata
  }
}

export default {
  buildHTTPMetadataFromURI,
  get,
  getMetadataFromTxId
}
