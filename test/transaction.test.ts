import {describe, it} from 'mocha';
import {Transaction} from '../src/transaction';
import {Memo} from '../src/memo';
import {assert, expect} from 'chai';

const SIG = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
const SIG2 = '2nPdn7AhJiTLaopwxCBzPxSB9ucBeBJbyKttXVBh7CoCQkmhkB12yoT6CuFStbT6X6boi9eFEpJjtRUQYVPcvM3J';

describe('Transaction', () => {
  it('Get transaction data', async () => {
    const res = await Transaction.get(SIG);
    assert.isObject(res);
  });

  it('Transaction decode memo', async () => {
    const tx = await Transaction.get(SIG2);
    const res = Memo.parseInstruction(tx);
    console.log(`# decode: `, res);
    expect(res).to.equal('{"tokenId": "dummy", "serialNo": "15/100"}');
  });
})