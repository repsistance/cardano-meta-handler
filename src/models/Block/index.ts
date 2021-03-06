import { Epoch } from ".."

type Int = number
type BigInt = number
/** ISO8601 string */
type DateTime = string
type SlotLeader = unknown
type Hash32Hex = string
type JSON = any
type Transaction = unknown
type Transaction_aggregate = unknown
type VRFVerificationKey = string

type Block = {
	epoch           : Epoch.Type
	epochNo         : Int
	fees            : BigInt
	forgedAt        : DateTime
	slotLeader      : SlotLeader
	hash            : Hash32Hex
	merkelRoot      : Hash32Hex
	number          : Int
	opCert          : Hash32Hex
	slotInEpoch     : Int
	slotNo          : Int
	previousBlock   : Block
	protocolVersion : JSON
	nextBlock       : Block
	size            : BigInt
	transactions    : Transaction[]
	transactions_aggregate : Transaction_aggregate
	transactionsCount      : string
	vrfKey                 : VRFVerificationKey
}

export type Type = Block

/** You may write useful functions to abstract data from this object here, alternatively you may export those functions in a functional style */
export class Wrapper {
	data: Block
	constructor( data : Block ) {
		this.data = data
	}
}


