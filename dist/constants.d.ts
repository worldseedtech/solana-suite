import { Commitment } from '@solana/web3.js';
export declare namespace ConstantsFunc {
    const switchEnvParam: (env: string | undefined) => {
        url: string;
    };
}
export declare namespace Constants {
    const API_URL: string;
    const SYSTEM_PROGRAM_ID = "11111111111111111111111111111111";
    const SPL_TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
    const SPL_ASSOCIATED_TOKEN_PROGRAM_ID = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
    const MEMO_PROGRAM_ID = "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo";
    const METAPLEX_PROGRAM_ID = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
    const COMMITMENT: Commitment;
}
