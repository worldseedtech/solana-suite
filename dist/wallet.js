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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var bs58_1 = __importDefault(require("bs58"));
var util_1 = require("./util");
var constants_1 = require("./constants");
var Wallet;
(function (Wallet) {
    var _this = this;
    var TOKEN_ASSOCIATED_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID);
    var METADATA_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.METAPLEX_PROGRAM_ID);
    var ACCOUNT_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID);
    Wallet.DEFAULT_AIRDROP_AMOUNT = web3_js_1.LAMPORTS_PER_SOL * 10;
    Wallet.getBalance = function (pubkey, unit) {
        if (unit === void 0) { unit = 'sol'; }
        return __awaiter(_this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.Util.getConnection().getBalance(new web3_js_1.PublicKey(pubkey))];
                    case 1:
                        balance = _a.sent();
                        switch (unit) {
                            case 'sol': return [2 /*return*/, balance / web3_js_1.LAMPORTS_PER_SOL];
                            case 'lamports': return [2 /*return*/, balance];
                            default: throw new Error('no match unit');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Wallet.create = function () { return __awaiter(_this, void 0, void 0, function () {
        var keypair;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keypair = web3_js_1.Keypair.generate();
                    if (!(process.env.NODE_ENV !== 'production')) return [3 /*break*/, 3];
                    return [4 /*yield*/, util_1.Util.getConnection().requestAirdrop(keypair.publicKey, Wallet.DEFAULT_AIRDROP_AMOUNT)];
                case 1:
                    _a.sent();
                    console.log('Now airdropping...please wait');
                    return [4 /*yield*/, util_1.Util.sleep(20)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, {
                        pubkey: keypair.publicKey.toBase58(),
                        secret: bs58_1.default.encode(keypair.secretKey)
                    }];
            }
        });
    }); };
    Wallet.findAssocaiatedTokenAddress = function (sourcePubkey, tokenId) { return __awaiter(_this, void 0, void 0, function () {
        var walletPubKey, tokenIdPublicKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    walletPubKey = new web3_js_1.PublicKey(sourcePubkey);
                    tokenIdPublicKey = new web3_js_1.PublicKey(tokenId);
                    return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                            walletPubKey.toBuffer(),
                            spl_token_1.TOKEN_PROGRAM_ID.toBuffer(),
                            tokenIdPublicKey.toBuffer(),
                        ], ACCOUNT_PROGRAM_ID)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    }); };
    Wallet.findMetaplexAssocaiatedTokenAddress = function (tokenId) { return __awaiter(_this, void 0, void 0, function () {
        var tokenIdPublicKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenIdPublicKey = new web3_js_1.PublicKey(tokenId);
                    return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                            Buffer.from('metadata'),
                            new web3_js_1.PublicKey(METADATA_PROGRAM_ID).toBuffer(),
                            tokenIdPublicKey.toBuffer(),
                        ], new web3_js_1.PublicKey(METADATA_PROGRAM_ID))];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    }); };
    Wallet.createAssociatedTokenAccountInstruction = function (associatedTokenAddress, payer, sourcePubkey, mintKey) {
        var keys = [
            {
                pubkey: new web3_js_1.PublicKey(payer),
                isSigner: true,
                isWritable: true,
            },
            {
                pubkey: new web3_js_1.PublicKey(associatedTokenAddress),
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: new web3_js_1.PublicKey(sourcePubkey),
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: new web3_js_1.PublicKey(mintKey),
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_1.SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: spl_token_1.TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: TOKEN_ASSOCIATED_PROGRAM_ID,
            data: Buffer.from([]),
        });
    };
})(Wallet = exports.Wallet || (exports.Wallet = {}));
//# sourceMappingURL=wallet.js.map