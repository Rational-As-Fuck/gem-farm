import { PublicKey } from '@solana/web3.js';

export * from './gem-bank';
export * from './gem-farm';
export * from './gem-common';

export const GEM_BANK_PROG_ID = new PublicKey(
  '2xonsH69aMQV4TZThqXesCid1vtvbH2wke9oR7rjULmM'
);
export const GEM_FARM_PROG_ID = new PublicKey(
  'A8cLyDaAMz11ZNFE3HaLV7LmCLzwcvDocAXoGwMR3RXY'
);
