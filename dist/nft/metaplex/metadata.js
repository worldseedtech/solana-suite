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
exports.MetaplexMetaData = void 0;
var web3_js_1 = require("@solana/web3.js");
var borsh_1 = require("borsh");
var wallet_1 = require("../../wallet");
var transaction_1 = require("../../transaction");
var constants_1 = require("../../constants");
var object_1 = require("./object");
var serialize_1 = require("./serialize");
var util_1 = require("../../util");
var spl_token_1 = require("@solana/spl-token");
var MetaplexMetaData;
(function (MetaplexMetaData) {
    var _this = this;
    var TOKEN_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.SPL_TOKEN_PROGRAM_ID);
    var METADATA_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.METAPLEX_PROGRAM_ID);
    var fetchMetaDataByMintKey = function (mintKey, encoded) {
        if (!encoded)
            return false;
        var decodeData = serialize_1.MetaplexSerialize.decode(encoded.data);
        return mintKey === decodeData.mintKey;
    };
    var fetchMetaDataByOwnerPubKey = function (ownerPubKey, encoded) {
        if (!encoded)
            return false;
        var decodeData = serialize_1.MetaplexSerialize.decode(encoded.data);
        return ownerPubKey === decodeData.ownerPubKey;
    };
    MetaplexMetaData.getByMintKey = function (mintKey) { return __awaiter(_this, void 0, void 0, function () {
        var accounts, matches;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transaction_1.Transaction.getProgramAccounts(constants_1.Constants.METAPLEX_PROGRAM_ID)];
                case 1:
                    accounts = _a.sent();
                    matches = accounts.filter(function (a) { return fetchMetaDataByMintKey(mintKey, a.account); });
                    return [2 /*return*/, serialize_1.MetaplexSerialize.decode(matches[0].account.data)];
            }
        });
    }); };
    // this function is very slowly from returned response. because alglism is liner search
    MetaplexMetaData.getByCreatedPubKey = function (ownerPubKey) { return __awaiter(_this, void 0, void 0, function () {
        var accounts, matches;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transaction_1.Transaction.getProgramAccounts(constants_1.Constants.METAPLEX_PROGRAM_ID)];
                case 1:
                    accounts = _a.sent();
                    matches = accounts.filter(function (a) { return fetchMetaDataByOwnerPubKey(ownerPubKey, a.account); });
                    return [2 /*return*/, matches.map(function (match) { return serialize_1.MetaplexSerialize.decode(match.account.data); })];
            }
        });
    }); };
    MetaplexMetaData.create = function (data, mintKey, payer, mintAuthorityKey, updateAuthority) {
        if (mintAuthorityKey === void 0) { mintAuthorityKey = payer; }
        if (updateAuthority === void 0) { updateAuthority = payer; }
        return function (instructions) { return __awaiter(_this, void 0, void 0, function () {
            var inst, metaAccount, value, txnData, keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inst = [];
                        inst = instructions ? instructions : inst;
                        return [4 /*yield*/, wallet_1.Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)];
                    case 1:
                        metaAccount = (_a.sent()).toBase58();
                        console.log('# metaAccount', metaAccount);
                        value = new object_1.MetaplexObject.CreateMetadataArgs({ data: data, isMutable: true });
                        txnData = Buffer.from((0, borsh_1.serialize)(object_1.MetaplexObject.SCHEMA, value));
                        keys = [
                            {
                                pubkey: new web3_js_1.PublicKey(metaAccount),
                                isSigner: false,
                                isWritable: true,
                            },
                            {
                                pubkey: new web3_js_1.PublicKey(mintKey),
                                isSigner: false,
                                isWritable: false,
                            },
                            {
                                pubkey: new web3_js_1.PublicKey(mintAuthorityKey),
                                isSigner: true,
                                isWritable: false,
                            },
                            {
                                pubkey: new web3_js_1.PublicKey(payer),
                                isSigner: true,
                                isWritable: false,
                            },
                            {
                                pubkey: new web3_js_1.PublicKey(updateAuthority),
                                isSigner: false,
                                isWritable: false,
                            },
                            {
                                pubkey: web3_js_1.SystemProgram.programId,
                                isSigner: false,
                                isWritable: false,
                            },
                            {
                                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                                isSigner: false,
                                isWritable: false,
                            },
                        ];
                        inst.push(new web3_js_1.TransactionInstruction({
                            keys: keys,
                            programId: METADATA_PROGRAM_ID,
                            data: txnData,
                        }));
                        return [2 /*return*/, inst];
                }
            });
        }); };
    };
    MetaplexMetaData.update = function (data, newUpdateAuthority, primarySaleHappened, mintKey, updateAuthority, recipientKey, sourceSecret) { return function (instructions) { return __awaiter(_this, void 0, void 0, function () {
        var inst, associatedTokenAccount, metaAccount, value, txnData, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inst = [];
                    inst = instructions ? instructions : inst;
                    return [4 /*yield*/, wallet_1.Wallet.findAssocaiatedTokenAddress(updateAuthority, mintKey)];
                case 1:
                    associatedTokenAccount = _a.sent();
                    console.log('# associatedTokenAccount: ', associatedTokenAccount.toBase58());
                    inst.push(wallet_1.Wallet.createAssociatedTokenAccountInstruction(associatedTokenAccount.toBase58(), updateAuthority, updateAuthority, mintKey));
                    inst.push(spl_token_1.Token.createMintToInstruction(TOKEN_PROGRAM_ID, new web3_js_1.PublicKey(mintKey), associatedTokenAccount, new web3_js_1.PublicKey(updateAuthority), [util_1.Util.createKeypair(sourceSecret)], 1));
                    return [4 /*yield*/, wallet_1.Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)];
                case 2:
                    metaAccount = (_a.sent()).toBase58();
                    value = new object_1.MetaplexObject.UpdateMetadataArgs({
                        data: data,
                        updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority,
                        primarySaleHappened: primarySaleHappened === null || primarySaleHappened === undefined
                            ? null
                            : primarySaleHappened,
                    });
                    txnData = Buffer.from((0, borsh_1.serialize)(object_1.MetaplexObject.SCHEMA, value));
                    keys = [
                        {
                            pubkey: new web3_js_1.PublicKey(metaAccount),
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: new web3_js_1.PublicKey(updateAuthority),
                            isSigner: true,
                            isWritable: false,
                        },
                    ];
                    inst.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: new web3_js_1.PublicKey(METADATA_PROGRAM_ID),
                        data: txnData,
                    }));
                    return [2 /*return*/, inst];
            }
        });
    }); }; };
})(MetaplexMetaData = exports.MetaplexMetaData || (exports.MetaplexMetaData = {}));
//# sourceMappingURL=metadata.js.map