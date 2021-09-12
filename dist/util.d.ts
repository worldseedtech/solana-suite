import { Connection, Keypair } from '@solana/web3.js';
export declare namespace Util {
    const sleep: (sec: number) => Promise<unknown>;
    const getConnection: () => Connection;
    const getApiUrl: () => string;
    const createKeypair: (secret: string) => Keypair;
    const dateFormat: () => string;
}
