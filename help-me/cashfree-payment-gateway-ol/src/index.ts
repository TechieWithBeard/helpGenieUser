import { registerPlugin } from '@capacitor/core';

import type { CashfreePaymentGatewayPlugin } from './definitions';

const CashfreePaymentGateway = registerPlugin<CashfreePaymentGatewayPlugin>(
  'CashfreePaymentGateway',
  {
    web: () => import('./web').then(m => new m.CashfreePaymentGatewayWeb()),
  },
);

export * from './definitions';
export { CashfreePaymentGateway };
