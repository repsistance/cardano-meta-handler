import { Block } from '..';
declare type ActiveStake = unknown;
declare type ActiveStake_aggregate = unknown;
declare type Block_aggregate = unknown;
declare type Int = number;
declare type BigInt = number;
declare type Hash32Hex = string;
declare type ShelleyProtocolParams = unknown;
declare type DateTime = string;
declare type Epoch = {
    activeStake: ActiveStake[];
    activeStake_aggregate: ActiveStake_aggregate;
    blocks: Block.Type[];
    blocks_aggregate: Block_aggregate;
    blocksCount: string;
    fees: BigInt;
    output: string;
    nonce: Hash32Hex;
    number: Int;
    protocolParams: ShelleyProtocolParams;
    transactionsCount: string;
    startedAt: DateTime;
    lastBlockTime: DateTime;
};
export declare type Type = Epoch;
export declare class Wrapper {
    data: Epoch;
    constructor(data: Epoch);
}
export {};
//# sourceMappingURL=index.d.ts.map