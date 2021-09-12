"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var util_1 = require("./util");
var transaction_1 = require("./transaction");
var SplToken;
(function (SplToken) {
    var _this = this;
    SplToken.create = function (sourceSecret, totalAmount, decimal, authority) {
        if (authority === void 0) { authority = util_1.Util.createKeypair(sourceSecret).publicKey.toBase58(); }
        return __awaiter(_this, void 0, void 0, function () {
            var connection, signer, authorityPubKey, token, tokenAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = util_1.Util.getConnection();
                        signer = new web3_js_1.Account(util_1.Util.createKeypair(sourceSecret).secretKey);
                        authorityPubKey = new web3_js_1.PublicKey(authority);
                        return [4 /*yield*/, spl_token_1.Token.createMint(connection, signer, authorityPubKey, null, decimal, spl_token_1.TOKEN_PROGRAM_ID)];
                    case 1:
                        token = _a.sent();
                        return [4 /*yield*/, token.createAssociatedTokenAccount(signer.publicKey)];
                    case 2:
                        tokenAccount = _a.sent();
                        return [4 /*yield*/, token.mintTo(tokenAccount, authorityPubKey, [], totalAmount)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { tokenId: token.publicKey.toBase58() }];
                }
            });
        });
    };
    SplToken.transfer = function (tokenId, sourceSecret, destination, amount, instruction) { return __awaiter(_this, void 0, void 0, function () {
        var tokenPubkey, destPubkey, signer, token, sourceTokenAccount, destTokenAccount, param, instructions, fn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenPubkey = new web3_js_1.PublicKey(tokenId);
                    destPubkey = new web3_js_1.PublicKey(destination);
                    signer = util_1.Util.createKeypair(sourceSecret);
                    token = new spl_token_1.Token(util_1.Util.getConnection(), tokenPubkey, spl_token_1.TOKEN_PROGRAM_ID, signer);
                    return [4 /*yield*/, token.getOrCreateAssociatedAccountInfo(signer.publicKey)];
                case 1:
                    sourceTokenAccount = (_a.sent()).address;
                    return [4 /*yield*/, token.getOrCreateAssociatedAccountInfo(destPubkey)];
                case 2:
                    destTokenAccount = (_a.sent()).address;
                    console.debug("[sourceTokenAccount:" + sourceTokenAccount.toBase58() + "]=>[destTokenAccount:" + destTokenAccount.toBase58() + "]");
                    param = spl_token_1.Token.createTransferInstruction(spl_token_1.TOKEN_PROGRAM_ID, sourceTokenAccount, destTokenAccount, signer.publicKey, [], amount);
                    instructions = instruction ? new Array(param, instruction) : [param];
                    fn = transaction_1.Transaction.send(signer.publicKey, [signer], destPubkey, amount);
                    return [4 /*yield*/, fn(instructions)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=spl-token.js.map