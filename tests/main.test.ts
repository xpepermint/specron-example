import { Spec } from '@specron/spec';

interface Data {
  alice?: string;
}

const spec = new Spec<Data>();

spec.beforeEach(async (ctx) => {
  const accounts = await ctx.web3.eth.getAccounts();
  ctx.set('alice', accounts[0]);
});

spec.test('able to set and get', async (ctx) => {
  const main = await ctx.deploy({
    src: './build/contracts/main.json',
    contract: 'Main',
  });

  const alice = ctx.get('alice');
  await main.instance.methods.set('100').send({from: alice});
  const value = await main.instance.methods.get().call();
  ctx.is(value, '0');
});

export default spec;
