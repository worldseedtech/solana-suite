"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexObject = void 0;
var MetaplexObject;
(function (MetaplexObject) {
    var Creator = /** @class */ (function () {
        function Creator(args) {
            this.address = args.address;
            this.verified = args.verified;
            this.share = args.share;
        }
        return Creator;
    }());
    MetaplexObject.Creator = Creator;
    var Data = /** @class */ (function () {
        function Data(args) {
            this.name = args.name;
            this.symbol = args.symbol;
            this.uri = args.uri;
            this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
            this.creators = args.creators;
        }
        return Data;
    }());
    MetaplexObject.Data = Data;
    var CreateMetadataArgs = /** @class */ (function () {
        function CreateMetadataArgs(args) {
            this.instruction = 0;
            this.data = args.data;
            this.isMutable = args.isMutable;
        }
        return CreateMetadataArgs;
    }());
    MetaplexObject.CreateMetadataArgs = CreateMetadataArgs;
    var UpdateMetadataArgs = /** @class */ (function () {
        function UpdateMetadataArgs(args) {
            this.instruction = 1;
            this.data = args.data ? args.data : null;
            this.updateAuthority = args.updateAuthority ? args.updateAuthority : null;
            this.primarySaleHappened = args.primarySaleHappened;
        }
        return UpdateMetadataArgs;
    }());
    MetaplexObject.UpdateMetadataArgs = UpdateMetadataArgs;
    var MetadataKey;
    (function (MetadataKey) {
        MetadataKey[MetadataKey["Uninitialized"] = 0] = "Uninitialized";
        MetadataKey[MetadataKey["MetadataV1"] = 4] = "MetadataV1";
        MetadataKey[MetadataKey["EditionV1"] = 1] = "EditionV1";
        MetadataKey[MetadataKey["MasterEditionV1"] = 2] = "MasterEditionV1";
        MetadataKey[MetadataKey["MasterEditionV2"] = 6] = "MasterEditionV2";
        MetadataKey[MetadataKey["EditionMarker"] = 7] = "EditionMarker";
    })(MetadataKey = MetaplexObject.MetadataKey || (MetaplexObject.MetadataKey = {}));
    var Metadata = /** @class */ (function () {
        function Metadata(args) {
            this.key = MetadataKey.MetadataV1;
            this.updateAuthority = args.updateAuthority;
            this.mint = args.mint;
            this.data = args.data;
            this.primarySaleHappened = args.primarySaleHappened;
            this.isMutable = args.isMutable;
            this.editionNonce = args.editionNonce;
        }
        return Metadata;
    }());
    MetaplexObject.Metadata = Metadata;
    MetaplexObject.SCHEMA = new Map([
        [
            CreateMetadataArgs,
            {
                kind: 'struct',
                fields: [
                    ['instruction', 'u8'],
                    ['data', Data],
                    ['isMutable', 'u8'], // bool
                ],
            },
        ],
        [
            UpdateMetadataArgs,
            {
                kind: 'struct',
                fields: [
                    ['instruction', 'u8'],
                    ['data', { kind: 'option', type: Data }],
                    ['updateAuthority', { kind: 'option', type: 'string' }],
                    ['primarySaleHappened', { kind: 'option', type: 'u8' }],
                ],
            },
        ],
        [
            Creator,
            {
                kind: 'struct',
                fields: [
                    ['address', 'string'],
                    ['verified', 'u8'],
                    ['share', 'u8'],
                ],
            },
        ],
        [
            Data,
            {
                kind: 'struct',
                fields: [
                    ['name', 'string'],
                    ['symbol', 'string'],
                    ['uri', 'string'],
                    ['sellerFeeBasisPoints', 'u16'],
                    ['creators', { kind: 'option', type: [Creator] }],
                ],
            },
        ],
        [
            Metadata,
            {
                kind: 'struct',
                fields: [
                    ['key', 'u8'],
                    ['mint', 'u8'],
                    ['data', Data],
                    ['primarySaleHappened', 'u8'],
                    ['isMutable', 'u8'], // bool
                ],
            },
        ],
    ]);
})(MetaplexObject = exports.MetaplexObject || (exports.MetaplexObject = {}));
//# sourceMappingURL=object.js.map