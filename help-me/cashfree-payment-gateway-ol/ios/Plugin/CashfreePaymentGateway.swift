import Foundation
import UIKit
import Capacitor
//import CashfreePG
//import CashfreePGCoreSDK

extension UIViewController {
    class func topViewController(base: UIViewController? = UIApplication.shared.windows.first?.rootViewController) -> UIViewController? {
        if let nav = base as? UINavigationController {
            return topViewController(base: nav.visibleViewController)
        }
        if let tab = base as? UITabBarController {
            if let selected = tab.selectedViewController {
                return topViewController(base: selected)
            }
        }
        if let presented = base?.presentedViewController {
            return topViewController(base: presented)
        }
        return base
    }
}



@objc public class CashfreePaymentGateway: NSObject {

//    private let pgService = CFPaymentGatewayService.getInstance()
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
    @objc func exampleMethod(_ sessionID:String,_ orderID:String) {
//        let paymentSessionID = sessionID;
//        print("from ios inner: "+paymentSessionID);
//        print("from ios: "+sessionID)
//         do{
//            
//             let session = try CFSession.CFSessionBuilder()
//                 .setOrderID(orderID)
//                 .setPaymentSessionId(sessionID)
//                 .setEnvironment(.SANDBOX)
//                 .build()
//             let payment = try CFWebCheckoutPayment.CFWebCheckoutPaymentBuilder()
//                 .setSession(session)
//                 .build()
//             let _webCheckoutPayment = try CFWebCheckoutPayment.CFWebCheckoutPaymentBuilder()
//                    .setSession(session)
//                    .build()
//             if let topViewController = UIViewController.topViewController() {
//                          try pgService.doPayment(payment, viewController: topViewController)
//                          print(payment)
//                      } else {
//                          print("Error: Unable to retrieve top view controller.")
//                      }
//            
//         } catch {
//            
//         }
               // Your payment processing logic here
               // Once payment is verified or failed, handle the response
               
    }
    
   
}



