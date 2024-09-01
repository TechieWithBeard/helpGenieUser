import Foundation
import Capacitor
/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CashfreePaymentGatewayPlugin)
public class CashfreePaymentGatewayPlugin: CAPPlugin {
    private let implementation = CashfreePaymentGateway()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }


    @objc func exampleMethod(_ call: CAPPluginCall) {
        let paymentSessionID = call.getString("paymentSessionID") ?? ""
        let orderID = call.getString("orderID") ?? ""
           print("from ios: ",call);
        call.resolve([
            "value": implementation.exampleMethod(paymentSessionID,orderID)
        ])
    }
 
}
