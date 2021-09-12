"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexSerialize = void 0;
var bs58_1 = __importDefault(require("bs58"));
var python_struct_1 = __importDefault(require("python-struct"));
var util_1 = require("util");
var constants_1 = require("../../constants");
var MetaplexSerialize;
(function (MetaplexSerialize) {
    var REPLACE = new RegExp('\u0000', 'g');
    MetaplexSerialize.decode = function (base64Data) {
        if (base64Data[0] !== 'B')
            return {};
        var data = Buffer.from(base64Data, 'base64');
        var textDecoder = new util_1.TextDecoder();
        var i = 1;
        var ownerPubKey = bs58_1.default.encode(python_struct_1.default.unpack("<" + 'B'.repeat(32), data.slice(i, i + 32)));
        i += 32;
        var mintKey = bs58_1.default.encode(python_struct_1.default.unpack("<" + 'B'.repeat(32), data.slice(i, i + 32)));
        if (mintKey === constants_1.Constants.SYSTEM_PROGRAM_ID)
            return {};
        i += 32;
        var nameLength = python_struct_1.default.unpack('<I', data.slice(i, i + 4))[0];
        i += 4;
        if (nameLength !== 32)
            return {};
        var nameBuffer = python_struct_1.default.unpack("<" + 'B'.repeat(nameLength), data.slice(i, i + nameLength));
        var name = textDecoder.decode(Uint8Array.from(nameBuffer)).replace(REPLACE, '');
        i += nameLength;
        var symbolLength = python_struct_1.default.unpack('<I', data.slice(i, i + 4))[0];
        i += 4;
        var symbolBuffer = python_struct_1.default.unpack("<" + 'B'.repeat(symbolLength), data.slice(i, i + symbolLength));
        var symbol = textDecoder.decode(Uint8Array.from(symbolBuffer)).replace(REPLACE, '');
        i += symbolLength;
        var uriLength = python_struct_1.default.unpack('<I', data.slice(i, i + 4))[0];
        i += 4;
        var uriBuffer = python_struct_1.default.unpack("<" + 'B'.repeat(uriLength), data.slice(i, i + uriLength));
        var uri = textDecoder.decode(Uint8Array.from(uriBuffer)).replace(REPLACE, '');
        i += uriLength;
        var fee = python_struct_1.default.unpack('<h', data.slice(i, i + 2))[0];
        return {
            ownerPubKey: ownerPubKey,
            mintKey: mintKey,
            name: name,
            symbol: symbol,
            uri: uri,
            fee: fee
        };
    };
})(MetaplexSerialize = exports.MetaplexSerialize || (exports.MetaplexSerialize = {}));
//# sourceMappingURL=serialize.js.map