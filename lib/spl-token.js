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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const util_1 = require("./util");
const transaction_1 = require("./transaction");
var SplToken;
(function (SplToken) {
    SplToken.create = (sourceSecret, totalAmount, decimal, authority = util_1.Util.createKeypair(sourceSecret).publicKey.toBase58()) => __awaiter(this, void 0, void 0, function* () {
        const connection = util_1.Util.getConnection();
        const signer = new web3_js_1.Account(util_1.Util.createKeypair(sourceSecret).secretKey);
        const authorityPubKey = new web3_js_1.PublicKey(authority);
        const token = yield spl_token_1.Token.createMint(connection, signer, authorityPubKey, null, decimal, spl_token_1.TOKEN_PROGRAM_ID);
        const tokenAccount = yield token.createAssociatedTokenAccount(signer.publicKey);
        yield token.mintTo(tokenAccount, authorityPubKey, [], totalAmount);
        return { tokenId: token.publicKey.toBase58() };
    });
    SplToken.transfer = (tokenId, sourceSecret, destination, amount, instruction) => __awaiter(this, void 0, void 0, function* () {
        const tokenPubkey = new web3_js_1.PublicKey(tokenId);
        const destPubkey = new web3_js_1.PublicKey(destination);
        const signer = util_1.Util.createKeypair(sourceSecret);
        const token = new spl_token_1.Token(util_1.Util.getConnection(), tokenPubkey, spl_token_1.TOKEN_PROGRAM_ID, signer);
        const sourceTokenAccount = (yield token.getOrCreateAssociatedAccountInfo(signer.publicKey)).address;
        const destTokenAccount = (yield token.getOrCreateAssociatedAccountInfo(destPubkey)).address;
        console.debug(`[sourceTokenAccount:${sourceTokenAccount.toBase58()}]=>[destTokenAccount:${destTokenAccount.toBase58()}]`);
        const param = spl_token_1.Token.createTransferInstruction(spl_token_1.TOKEN_PROGRAM_ID, sourceTokenAccount, destTokenAccount, signer.publicKey, [], amount);
        const instructions = instruction ? new Array(param, instruction) : [param];
        const fn = transaction_1.Transaction.send(signer.publicKey, [signer], destPubkey, amount);
        return yield fn(instructions);
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));