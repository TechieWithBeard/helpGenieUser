import { WebPlugin } from '@capacitor/core';

import type { PaymentCFPlugin } from './definitions';
declare var Cashfree: any;
export class PaymentCFWeb extends WebPlugin implements PaymentCFPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async exampleMethod(options:{paymentSessionID:string,orderID:string,returnURL:string}):Promise<any>{

   
    this.loadMyScript().then(r=>{
      if(r){


        let cashfree = Cashfree({
          mode: "sandbox", //or production,
          returnUrl: options.returnURL,
        });


      //   let checkoutOptions = {
      //     paymentSessionId:options.paymentSessionID,
      //     returnUrl: options.returnURL,
          
      // }
    

      cashfree.checkout({
        paymentSessionId: options.paymentSessionID,
        returnUrl: options.returnURL,
      })



      //       Cashfree.checkout(checkoutOptions).then((result:any)=>{
      //             if(result.error){
      //                 alert(result.error.message)
      //             }
      //             if(result.redirect){
      //                 console.log("Redirection")
      //             }
      // });
      }
   
    });
  
}


loadScript(url: string, callback: () => void) {
  const script = document.createElement("script");
  script.type = "text/javascript";

  script.onload = () => {
      callback();
  };

  script.src = url;
  document.head.appendChild(script);
  // document.getElementsByTagName("head")[0].appendChild(script);
}


// Method to load the script
loadMyScript() :Promise<any>{
  return new Promise((resolve,reject)=>{
    try{
      const scriptUrl = "https://sdk.cashfree.com/js/v3/cashfree.js"; // Replace with your script URL
      this.loadScript(scriptUrl, () => {
          console.log("Script loaded successfully");
          resolve(true)
          // Perform further actions related to the script once it's loaded
      });
    }catch(error){
      reject()
    }
 
  })

}



}




