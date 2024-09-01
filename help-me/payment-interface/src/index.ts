import { registerPlugin } from '@capacitor/core';

import type { PaymentCFPlugin } from './definitions';

const PaymentCF = registerPlugin<PaymentCFPlugin>('PaymentCF', {
  web: () => import('./web').then(m => new m.PaymentCFWeb()),
});

export * from './definitions';
export { PaymentCF };
