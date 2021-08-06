import {describe, it} from 'mocha';
import {Wallet} from '../src/wallet';
import {assert, expect} from 'chai';

let source: Wallet.Keypair;

describe('Wallet', () => {
  before(async () => {
    source = await Wallet.create();
  });

  it('return Account(Keypair) object', async () => {
    console.log(`created account(pubkey): ${source.pubkey}`);
    console.log(`created account(secret): ${source.secret}`);
    assert.isObject(source);
  });

  it('Get balance at publicKey', async () => {
    const res = await Wallet.getBalance(source.pubkey);
    console.log(res);
    expect(res).to.equal(10);
  });

  it('Get balance at publicKey via lamports', async () => {
    const res = await Wallet.getBalance(source.pubkey, 'lamports');
    console.log(res);
    expect(res).to.equal(Wallet.DEFAULT_AIRDROP_AMOUNT);
  });

  it('find token address', async () => {
    const res = await Wallet.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ',
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS',
    );
    assert.isNotNull(res.toBase58());
  });
})