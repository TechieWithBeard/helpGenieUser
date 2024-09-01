import Foundation
import UIKit
//import CashfreeAnalyticsSDK
//import CashfreePG
//import CashfreePGCoreSDK








@objc public class PaymentCF: NSObject {

  public  let pgService = CFPaymentGatewayService.getInstance()
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }

    
    
    @objc func exampleMethod(_ sessionID: String, _ orderID: String) {
        DispatchQueue.main.async {
            let paymentSessionID = sessionID
            print("from ios inner: ", paymentSessionID)
            print("from ios orderID: " , orderID)
            do {
                let session = try CFSession.CFSessionBuilder()
                    .setOrderID(orderID)
                    .setPaymentSessionId(paymentSessionID)
                    .setEnvironment(.SANDBOX)
                    .build()
                print("from ios session: ", session)
                let payment = try CFWebCheckoutPayment.CFWebCheckoutPaymentBuilder()
                    .setSession(session)
                    .build()

//                try pgService.doPayment(payment, viewController:[self.viewController presentViewController:yourViewController animated:YES completion:nil])
//                    print(payment)
              
            }catch let e {
                let err = e as! CashfreeError
                print(err.description)
              }
        }
    }
}
