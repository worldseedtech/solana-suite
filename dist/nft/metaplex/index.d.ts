import { TransactionInstruction, TransactionSignature } from '@solana/web3.js';
import { MetaplexObject } from './object';
export declare namespace Metaplex {
    const transfer: (tokenKey: string, sourceSecret: string, destPubKey: string, instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
    const mint: (data: MetaplexObject.Data, owner: {
        pubkey: string;
        secret: string;
    }) => Promise<{
        mintKey: string;
        tx: string;
    }>;
}
