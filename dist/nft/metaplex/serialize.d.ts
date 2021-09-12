import struct from 'python-struct';
export declare namespace MetaplexSerialize {
    const decode: (base64Data: string) => {
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
        fee: struct.DataType;
    };
}
