import { WebPlugin } from '@capacitor/core';

import type { CashfreePaymentGatewayPlugin, PaymentFailedEventData, PaymentVerifiedEventData } from './definitions';

declare var Cashfree: any;
export class CashfreePaymentGatewayWeb
  extends WebPlugin
  implements CashfreePaymentGatewayPlugin
{
 
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async exampleMethod(options:{paymentSessionID:string,orderID:string,returnURL?:string}):Promise<any>{


    let checkoutOptions = {
      paymentSessionId:options.paymentSessionID,
      returnUrl: options.returnURL,
      
  }

        Cashfree.checkout(checkoutOptions).then((result:any)=>{
              if(result.error){
                  alert(result.error.message)
              }
              if(result.redirect){
                  console.log("Redirection")
              }
  });
}


async registerListener(eventName: string): Promise<void> {
  // Your implementation to register the listener
  console.log(`Registered listener for event: ${eventName}`);
}

async unregisterListener(eventName: string): Promise<void> {
  // Your implementation to unregister the listener
  console.log(`Unregistered listener for event: ${eventName}`);
}


}
