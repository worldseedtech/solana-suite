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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const bs58_1 = __importDefault(require("bs58"));
const util_1 = require("./util");
const constants_1 = require("./constants");
var Wallet;
(function (Wallet) {
    const TOKEN_ASSOCIATED_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID);
    const METADATA_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.METAPLEX_PROGRAM_ID);
    const ACCOUNT_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID);
    Wallet.DEFAULT_AIRDROP_AMOUNT = web3_js_1.LAMPORTS_PER_SOL * 1;
    Wallet.getBalance = (pubkey, unit = 'sol') => __awaiter(this, void 0, void 0, function* () {
        const balance = yield util_1.Util.getConnection().getBalance(new web3_js_1.PublicKey(pubkey));
        switch (unit) {
            case 'sol': return balance / web3_js_1.LAMPORTS_PER_SOL;
            case 'lamports': return balance;
            default: throw new Error('no match unit');
        }
    });
    Wallet.create = () => __awaiter(this, void 0, void 0, function* () {
        const keypair = web3_js_1.Keypair.generate();
        if (process.env.NODE_ENV !== 'production') {
            yield util_1.Util.getConnection().requestAirdrop(keypair.publicKey, Wallet.DEFAULT_AIRDROP_AMOUNT);
            console.log('Now airdropping...please wait');
            yield util_1.Util.sleep(20);
        }
        return {
            pubkey: keypair.publicKey.toBase58(),
            secret: bs58_1.default.encode(keypair.secretKey)
        };
    });
    Wallet.findAssocaiatedTokenAddress = (sourcePubkey, tokenId) => __awaiter(this, void 0, void 0, function* () {
        const walletPubKey = new web3_js_1.PublicKey(sourcePubkey);
        const tokenIdPublicKey = new web3_js_1.PublicKey(tokenId);
        return (yield web3_js_1.PublicKey.findProgramAddress([
            walletPubKey.toBuffer(),
            spl_token_1.TOKEN_PROGRAM_ID.toBuffer(),
            tokenIdPublicKey.toBuffer(),
        ], ACCOUNT_PROGRAM_ID))[0];
    });
    Wallet.findMetaplexAssocaiatedTokenAddress = (tokenId) => __awaiter(this, void 0, void 0, function* () {
        const tokenIdPublicKey = new web3_js_1.PublicKey(tokenId);
        return (yield web3_js_1.PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            new web3_js_1.PublicKey(METADATA_PROGRAM_ID).toBuffer(),
            tokenIdPublicKey.toBuffer(),
        ], new web3_js_1.PublicKey(METADATA_PROGRAM_ID)))[0];
    });
    Wallet.createAssociatedTokenAccountInstruction = (associatedTokenAddress, payer, sourcePubkey, mintKey) => {
        const keys = [
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
            keys,
            programId: TOKEN_ASSOCIATED_PROGRAM_ID,
            data: Buffer.from([]),
        });
    };
})(Wallet = exports.Wallet || (exports.Wallet = {}));