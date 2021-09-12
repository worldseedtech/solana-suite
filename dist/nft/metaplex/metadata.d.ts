import { TransactionInstruction } from '@solana/web3.js';
import { MetaplexObject } from './object';
export declare namespace MetaplexMetaData {
    const getByMintKey: (mintKey: string) => Promise<{
        ownerPubKey?: undefined;
        mintKey?: undefined;
        name?: undefined;
        symbol?: undefined;
        uri?: undefined;
        fee?: undefined;
    } | {
        ownerPubKey: string;
        mintKey: string;
        name: string;
        symbol: string;
        uri: string;
        fee: import("python-struct").DataType;
    }>;
    const getByCreatedPubKey: (ownerPubKey: string) => Promise<({
        ownerPubKey?: undefined;
        mintKey?: undefined;
        name?: undefined;
        symbol?: undefined;
        uri?: undefined;
        fee?: undefined;
    } | {
        ownerPubKey: string;
        mintKey: string;
        name: string;
        symbol: string;
        uri: string;
        fee: import("python-struct").DataType;
    })[]>;
    const create: (data: MetaplexObject.Data, mintKey: string, payer: string, mintAuthorityKey?: string, updateAuthority?: string) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
    const update: (data: MetaplexObject.Data | undefined, newUpdateAuthority: string | undefined, primarySaleHappened: boolean | null | undefined, mintKey: string, updateAuthority: string, recipientKey: string, sourceSecret: string) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
}
