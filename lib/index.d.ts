declare type Headers = Record<string, string>;
export declare const getGraphqlUrl: (network: string) => string;
export declare const buildHTTPMetadataFromURI: (uri: string, customHeaders: Headers, compressed: unknown) => Promise<any>;
export declare function getMetadataFromTxId(txId: string, metadataKey: string, grapqhlEndpoint: string): Promise<any>;
export declare function get(uri: string): Promise<any>;
declare const _default: {
    buildHTTPMetadataFromURI: (uri: string, customHeaders: Headers, compressed: unknown) => Promise<any>;
    get: typeof get;
    getMetadataFromTxId: typeof getMetadataFromTxId;
};
export default _default;
//# sourceMappingURL=index.d.ts.map