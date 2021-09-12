import { Keypair, TransactionInstruction } from '@solana/web3.js';
export declare namespace MetaplexNft {
    const mint: (payer: string, signerSecrets: string[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<{
        instructions: TransactionInstruction[];
        signers: Keypair[];
        mintKey: string;
    }>;
}
