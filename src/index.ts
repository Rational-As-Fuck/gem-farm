import { PublicKey } from '@solana/web3.js';

export * from './gem-bank';
export * from './gem-farm';
export * from './gem-common';

export const GEM_BANK_PROG_ID = new PublicKey(
  'CcqXpbmiqCtpv7wZMJcVrmmjAcNo6Wz4zQiMeQrtbvtC'
);
export const GEM_FARM_PROG_ID = new PublicKey(
  '8q6iXyzUS4kWdbQsZs9rU4WNSw6wieW4GdE6dDZsrDka'
);
