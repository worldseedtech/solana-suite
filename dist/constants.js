"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = exports.ConstantsFunc = void 0;
var ConstantsFunc;
(function (ConstantsFunc) {
    ConstantsFunc.switchEnvParam = function (env) {
        var response = { url: '' };
        switch (env) {
            case 'development':
                response.url = 'http://api.devnet.solana.com';
                break;
            case 'production':
                response.url = 'https://api.solana.com';
                break;
            default:
                response.url = 'http://api.devnet.solana.com';
        }
        return response;
    };
})(ConstantsFunc = exports.ConstantsFunc || (exports.ConstantsFunc = {}));
var Constants;
(function (Constants) {
    Constants.API_URL = ConstantsFunc.switchEnvParam(process.env.NODE_ENV).url;
    Constants.SYSTEM_PROGRAM_ID = '11111111111111111111111111111111';
    Constants.SPL_TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
    Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
    Constants.MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo';
    Constants.METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
    Constants.COMMITMENT = 'singleGossip';
})(Constants = exports.Constants || (exports.Constants = {}));
//# sourceMappingURL=constants.js.map