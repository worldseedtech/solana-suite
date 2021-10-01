import {describe, it} from 'mocha';
import {assert} from 'chai';
import {MetaplexSerialize, MetaplexInstructure} from '../../../src/nft/metaplex';
import {deserializeUnchecked} from 'borsh';

const bufferData = Buffer.from([4, 90, 255, 219, 226, 72, 51, 0, 52, 25, 169, 139, 211, 14, 3, 238, 120, 33, 119, 249, 167, 248, 238, 112, 235, 6, 88, 249, 48, 98, 249, 19, 5, 225, 88, 47, 37, 41, 111, 213, 63, 225, 255, 67, 152, 242, 201, 223, 235, 81, 66, 44, 75, 24, 189, 21, 136, 165, 89, 97, 228, 236, 85, 101, 36, 32, 0, 0, 0, 67, 97, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 67, 65, 84, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 104, 116, 116, 112, 115, 58, 47, 47, 97, 114, 119, 101, 97, 118, 101, 46, 110, 101, 116, 47, 75, 89, 74, 49, 85, 90, 50, 88, 48, 87, 70, 57, 119, 97, 107, 101, 49, 89, 121, 105, 74, 88, 75, 120, 105, 101, 107, 50, 66, 95, 108, 110, 117, 72, 116, 110, 53, 82, 49, 122, 68, 53, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 1, 1, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

describe('MetaplexSerialize', () => {
  it.only('Decode serialized data2', () => {
    deserializeUnchecked(
      MetaplexInstructure.SCHEMA, 
      MetaplexInstructure.CreateMetadataArgs, 
      bufferData
    );
  });

  it('Decode serialized data', () => {
    const orgData = {
      updateAuthority: '78DybLoke46TR6RW1HWZBMYt7qouGggQJjLATsfL7RwA',
      mint: 'GAeiuYNYaTe36wuvsNesTqbeZJxoLRgXkKM6gF5ZFAmy',
      name: 'Cat',
      symbol: 'CAT',
      uri: 'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50',
      sellerFeeBasisPoints: 100
    }

    const res = MetaplexSerialize.decode(bufferData);

    if (!res) assert.fail('None res data');

    console.log('# decode metadata: ', res);

    assert.equal(res.name, orgData.name);
    assert.equal(res.symbol, orgData.symbol);
    assert.equal(res.uri, orgData.uri);
    assert.equal(res.mint, orgData.mint);
    assert.equal(res.updateAuthority, orgData.updateAuthority);
    assert.equal(res.sellerFeeBasisPoints, orgData.sellerFeeBasisPoints);
  });
})
