import { Block } from '..'

type ActiveStake = unknown
type ActiveStake_aggregate = unknown
type Block_aggregate = unknown
type Int = number
type BigInt = number
type Hash32Hex = string
type ShelleyProtocolParams = unknown
/** ISO8601 string */
type DateTime = string

type Epoch = {
	activeStake : ActiveStake[]
	activeStake_aggregate: ActiveStake_aggregate
	blocks: Block.Type[]
	blocks_aggregate: Block_aggregate
	blocksCount: string
	fees: BigInt
	output: string
	nonce: Hash32Hex
	number: Int
	protocolParams: ShelleyProtocolParams
	transactionsCount: string
	startedAt: DateTime
	lastBlockTime: DateTime
}

export type Type = Epoch
