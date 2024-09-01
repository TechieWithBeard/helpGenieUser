import Foundation
import Capacitor
//import CashfreeAnalyticsSDK
//import CashfreePG
//import CashfreePGCoreSDK

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(PaymentCFPlugin)
public class PaymentCFPlugin: CAPPlugin, MyViewControllerDelegate {
    var sampleCall:CAPPluginCall?;
    func myViewControllerDidFinish(_ viewController: MyViewController,order_id:String) {
        print("PAyment Doen")
        if let callbackId = viewController.callbackId {
            self.bridge?.releaseCall(withID: callbackId)
            sampleCall?.resolve(
                [
                            "value":order_id
                        ]
            )
//            releaseCall(callbackId)
          }
    }
    
    private let implementation = PaymentCF()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
    
    @objc func exampleMethod(_ call: CAPPluginCall) {
        
        let paymentSessionID = call.getString("paymentSessionID") ?? ""
        let orderID = call.getString("orderID") ?? ""
        let callbackId = call.callbackId
           print("from ios: ",call);
        
   
        
        DispatchQueue.main.async {
            let myViewController = MyViewController(sessionID: paymentSessionID, orderID: orderID,callbackId: callbackId)
               myViewController.delegate = self
            self.bridge?.viewController?.present(myViewController, animated: true, completion: nil)
        }
        sampleCall=call;
        self.bridge?.saveCall(call)
//        call.keepAlive = true
//        call.resolve([
//            "value": implementation.exampleMethod(paymentSessionID,orderID)
//        ])
    }
}
