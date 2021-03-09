import axios from 'axios'
import pako from 'pako'
import parseUri from 'parse-uri'
import atob from 'atob'
import btoa from 'btoa'
import fs from 'fs'
import mime from 'mime-types'
import MockAdapter from 'axios-mock-adapter'
import { Transaction } from './models'
import curry from 'typed-curry'

type Headers = Record<string, string>

const HTTP_RESPONSE_METADATUM = 104116116112

export const dandelionGraphQLURI = ( network : 'testnet' | 'mainnet' ) => (
  `https://graphql-api.${network}.dandelion.link/`
)

const chunkArray = ( arr : string, size : number ) => {
    var myArray = []
    for(var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i+size))
    }
    return myArray
}

const fileMetadata = async ( path : string ) => ( {
    headers : { 'Content-Type' : mime.lookup( path ) },
    data : fs.readFileSync( path )
} )

const binData = ( data : string ) => pako.gzip( JSON.stringify(data) )
const strData = ( bin : Uint8Array ) => String.fromCharCode.apply( null, new Uint16Array(bin) as unknown as number[] )
const compress = ( data : any ) => strData( binData( data ) )
const compressTo64 = ( data : any ) => chunkArray( btoa( compress( data ) ), 64 )
const toBase64Mess = curry ( (
  compressed : boolean,
  customHeaders : any,
  { data, headers } : { data : any, headers : any

} ) => {

  headers['Content-Transfer-Encoding'] = 'base64'

  if ( compressed ) {
    headers['Content-Encoding'] = 'gzip'
	}

  return {
    headers : { ...headers, ...customHeaders },
    response: {
      data: compressed ? compressTo64( data ) : chunkArray( data, 64)
    }
  }
} )
const messyMetadata = async ( uri : string ) => {
  const parsed = parseUri( uri )

  if ( parsed.protocol === 'file' ) {
    return fileMetadata( parsed.path )
  } else {
    return axios.get(uri)
  }
}
export const buildHTTPMetadataFromURI = async ( uri : string, customHeaders : Headers, compressed : boolean ) => (
  messyMetadata( uri ).then( toBase64Mess( compressed, customHeaders ) )
)

export const get = async ( uri : string ) => {

	const parsedUri = parseUri(uri)
	const grapqhlEndpoint = parsedUri.queryKey['graphql'] ?? (
    dandelionGraphQLURI( parsedUri.queryKey['network'] )
  )

  let metadata;
  if ( parsedUri.protocol === 'file' ) {
    metadata = JSON.parse( fs.readFileSync( parsedUri.path, 'utf-8') )[HTTP_RESPONSE_METADATUM]
  } else {
    metadata = await Transaction.metadataByID(parsedUri.authority, parsedUri.queryKey.key, grapqhlEndpoint)
  }

  if ( parsedUri.queryKey['type'] !== 'http-response' ) {
    return metadata
  }

  var mock = new MockAdapter(axios)
  var strData : string
  var responseData
  var response : number[]
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
  var charData = strData.split('').map( ( x : string ) => x.charCodeAt(0) )
  var binData  = new Uint8Array(charData)
  var inflatedData = pako.inflate(binData)
  responseData = String.fromCharCode.apply( null, new Uint16Array(inflatedData) as unknown as number[] )
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

}

export * as Fetch from './fetch'
export * from './models'
