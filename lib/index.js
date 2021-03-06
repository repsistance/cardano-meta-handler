"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch = exports.get = exports.getMetadataFromTxId = exports.buildHTTPMetadataFromURI = exports.getGraphqlUrl = void 0;
var axios_1 = __importDefault(require("axios"));
var pako_1 = __importDefault(require("pako"));
var parse_uri_1 = __importDefault(require("parse-uri"));
var atob_1 = __importDefault(require("atob"));
var btoa_1 = __importDefault(require("btoa"));
var fs_1 = __importDefault(require("fs"));
var mime_types_1 = __importDefault(require("mime-types"));
var HTTP_RESPONSE_METADATUM = 104116116112;
var axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
var getGraphqlUrl = function (network) {
    return "https://graphql-api." + network + ".dandelion.link/";
};
exports.getGraphqlUrl = getGraphqlUrl;
var chunkArray = function (arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
        myArray.push(arr.slice(i, i + size));
    }
    return myArray;
};
var buildHTTPMetadataFromURI = function (uri, customHeaders, compressed) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedUri, response, b64data, metadataObj, headers, _a, binData, strData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                parsedUri = parse_uri_1.default(uri);
                metadataObj = {};
                headers = {};
                if (customHeaders) {
                    headers = customHeaders;
                }
                _a = parsedUri.protocol;
                switch (_a) {
                    case 'file': return [3, 1];
                }
                return [3, 2];
            case 1:
                response = { headers: headers, data: fs_1.default.readFileSync(parsedUri.path, 'utf-8') };
                if (!headers['Content-Type']) {
                    headers['Content-Type'] = mime_types_1.default.lookup(parsedUri.path);
                }
                return [3, 4];
            case 2: return [4, axios_1.default.get(uri)];
            case 3:
                response = _b.sent();
                if (!headers['Content-Type']) {
                    headers['Content-Type'] = response.headers['content-type'];
                }
                _b.label = 4;
            case 4:
                metadataObj[HTTP_RESPONSE_METADATUM] = {};
                headers['Content-Transfer-Encoding'] = "base64";
                if (compressed) {
                    headers['Content-Encoding'] = "gzip";
                    binData = pako_1.default.gzip(JSON.stringify(response.data));
                    strData = String.fromCharCode.apply(null, new Uint16Array(binData));
                    b64data = chunkArray(btoa_1.default(strData), 64);
                }
                else {
                    b64data = chunkArray(response.data, 64);
                }
                metadataObj[HTTP_RESPONSE_METADATUM] = { headers: headers, response: { data: b64data } };
                return [2, metadataObj];
        }
    });
}); };
exports.buildHTTPMetadataFromURI = buildHTTPMetadataFromURI;
function getMetadataFromTxId(txId, metadataKey, grapqhlEndpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var graphqlQuery, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    graphqlQuery = "{ transactions( where: { hash: { _eq: \"" + txId + "\" }, metadata: { key: { _eq: \"" + metadataKey + "\" } } } ) { metadata { value } } }";
                    return [4, axios_1.default.post(grapqhlEndpoint, { query: graphqlQuery })];
                case 1:
                    response = _a.sent();
                    return [2, response.data.data.transactions[0].metadata[0].value];
            }
        });
    });
}
exports.getMetadataFromTxId = getMetadataFromTxId;
function get(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var grapqhlEndpoint, parsedUri, metadata, _a, _b, mock, strData, responseData, response, jointData, charData, binData, inflatedData, axiosResponse;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    parsedUri = parse_uri_1.default(uri);
                    if (parsedUri.queryKey['graphql']) {
                        grapqhlEndpoint = parsedUri.queryKey['graphql'];
                    }
                    else {
                        if (parsedUri.queryKey['network']) {
                            grapqhlEndpoint = exports.getGraphqlUrl(parsedUri.queryKey['network']);
                        }
                    }
                    _a = parsedUri.protocol;
                    switch (_a) {
                        case 'file': return [3, 1];
                    }
                    return [3, 2];
                case 1:
                    metadata = JSON.parse(fs_1.default.readFileSync(parsedUri.path, 'utf-8'))[HTTP_RESPONSE_METADATUM];
                    return [3, 4];
                case 2: return [4, getMetadataFromTxId(parsedUri.authority, parsedUri.queryKey.key, grapqhlEndpoint)];
                case 3:
                    metadata = _c.sent();
                    _c.label = 4;
                case 4:
                    _b = parsedUri.queryKey['type'];
                    switch (_b) {
                        case 'http-response': return [3, 5];
                    }
                    return [3, 9];
                case 5:
                    mock = new axios_mock_adapter_1.default(axios_1.default);
                    jointData = metadata.response.data.join('');
                    if (!!metadata.headers) return [3, 6];
                    response = [500];
                    return [3, 8];
                case 6:
                    if (metadata.headers['Content-Transfer-Encoding'] == "base64") {
                        strData = atob_1.default(jointData);
                    }
                    else {
                        strData = jointData;
                    }
                    if (metadata.headers['Content-Encoding'] == "gzip") {
                        charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
                        binData = new Uint8Array(charData);
                        inflatedData = pako_1.default.inflate(binData);
                        responseData = String.fromCharCode.apply(null, new Uint16Array(inflatedData));
                    }
                    else {
                        responseData = strData;
                    }
                    if (responseData) {
                        response = [200, responseData, metadata.headers];
                    }
                    else {
                        response = [204, "", metadata.headers];
                    }
                    mock.onGet(uri).reply(function () {
                        return response;
                    });
                    return [4, axios_1.default.get(uri)];
                case 7:
                    axiosResponse = _c.sent();
                    mock.restore();
                    return [2, axiosResponse];
                case 8: return [3, 10];
                case 9: return [2, metadata];
                case 10: return [2];
            }
        });
    });
}
exports.get = get;
exports.default = {
    buildHTTPMetadataFromURI: exports.buildHTTPMetadataFromURI,
    get: get,
    getMetadataFromTxId: getMetadataFromTxId
};
exports.Fetch = __importStar(require("./fetch"));
__exportStar(require("./models"), exports);
//# sourceMappingURL=index.js.map