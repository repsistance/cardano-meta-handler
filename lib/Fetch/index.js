"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dandelionGQL = void 0;
var dandelionGQL = function (network) { return (function (query) { return (fetch("https://graphql-api." + network + ".dandelion.link/", {
    method: 'POST',
    body: JSON.stringify({ query: query.trim(), operationName: null, variables: {} }),
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
})
    .then(function (res) { return res.json(); })
    .then(function (json) { return json.data; })); }); };
exports.dandelionGQL = dandelionGQL;
//# sourceMappingURL=index.js.map