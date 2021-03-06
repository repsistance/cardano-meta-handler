import { Epoch } from "..";
declare type Int = number;
declare type BigInt = number;
declare type DateTime = string;
declare type SlotLeader = unknown;
declare type Hash32Hex = string;
declare type JSON = any;
declare type Transaction = unknown;
declare type Transaction_aggregate = unknown;
declare type VRFVerificationKey = string;
declare type Block = {
    epoch: Epoch.Type;
    epochNo: Int;
    fees: BigInt;
    forgedAt: DateTime;
    slotLeader: SlotLeader;
    hash: Hash32Hex;
    merkelRoot: Hash32Hex;
    number: Int;
    opCert: Hash32Hex;
    slotInEpoch: Int;
    slotNo: Int;
    previousBlock: Block;
    protocolVersion: JSON;
    nextBlock: Block;
    size: BigInt;
    transactions: Transaction[];
    transactions_aggregate: Transaction_aggregate;
    transactionsCount: string;
    vrfKey: VRFVerificationKey;
};
export declare type Type = Block;
export declare class Wrapper {
    data: Block;
    constructor(data: Block);
}
export {};
//# sourceMappingURL=index.d.ts.map