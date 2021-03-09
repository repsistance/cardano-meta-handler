import axios from "axios"
import curry from 'typed-curry'
import { Block } from ".."

type Int                         = number
type BigInt                      = number
type Hash32Hex                   = string
type TransactionInput            = unknown
type TransactionInput_aggregate  = unknown
type TransactionMetadata         = unknown
type Token                       = unknown[]
type Token_aggregate             = unknown
type TransactionOutput           = unknown
type TransactionOutput_aggregate = unknown
/** ISO8601 string */
type DateTime                    = string
type Withdrawal                  = unknown
type Withdrawal_aggregate        = unknown

type Transaction = {
	block                 : Block.Type
	blockIndex            : Int
	deposit               : BigInt
	fee                   : BigInt
	hash                  : Hash32Hex
	inputs                : TransactionInput[]
	inputs_aggregate      : TransactionInput_aggregate
	invalidBefore         : string
	invalidHereafter      : string
	metadata              : TransactionMetadata[]
	mint                  : Token
	mint_aggregate        : Token_aggregate
	outputs               : TransactionOutput[]
	outputs_aggregate     : TransactionOutput_aggregate
	size                  : BigInt
	totalOutput           : string
	includedAt            : DateTime
	withdrawals           : Withdrawal[]
	withdrawals_aggregate : Withdrawal_aggregate
}
export type Type = Transaction

/** Curried function, usaged
 * metadataByID( uri )( key )( id ) or
 * metadataByID( uri, key )( id ) or
 * metadataByID( uri, key, id )
 * it helps predefining values while using the same function over and over again
 */
export const metadataByID = curry( async ( uri : string, key : string, id : string ) => (
	axios.post( uri, {
		query: `{ transactions( where: { hash: { _eq: "${id}" }, metadata: { key: { _eq: "${key}" } } } ) { metadata { value } } }`
	} )
	.then( response => response?.data?.data?.transactions?.[0].metadata?.[0]?.value )
) )
