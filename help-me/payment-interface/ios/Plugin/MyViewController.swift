//
//  MyViewController.swift
//  Plugin  m
//   
//  Created by APPLE on 22/02/24.
//  Copyright © 2024 Max Lynch. All rights reserved.
//

import UIKit
//import CashfreeAnalyticsSDK
//import CashfreePG
//import CashfreePGCoreSDK
//import CashfreePGUISDK
import Capacitor

protocol MyViewControllerDelegate: AnyObject {
    func myViewControllerDidFinish(_ viewController: MyViewController,order_id:String)
}


class MyViewController:UIViewController, CFResponseDelegate {

    weak var delegate: MyViewControllerDelegate?
    var callbackId: String?

       
    let sessionID: String
       let orderID: String
       
       init(sessionID: String, orderID: String, callbackId: String?) {
           self.sessionID = sessionID
           self.orderID = orderID
           self.callbackId = callbackId
                super.init(nibName: nil, bundle: nil)
       }
    
    required init?(coder: NSCoder) {
           fatalError("init(coder:) has not been implemented")
       }
    func dismissViewController(order_id:String) {
            dismiss(animated: true) { [weak self] in
                guard let self = self else { return }
                self.delegate?.myViewControllerDidFinish(self,order_id: order_id)
            }
        }
    
    
    
    func onError(_ error: CashfreePGCoreSDK.CFErrorResponse, order_id: String) {
        print("title: ",error.status ?? "ERROR","message:", error.message ?? "error_message_not_present")
//        self.createAlert(
//          title: error.status ?? "ERROR", message: error.message ?? "error_message_not_present")
        dismissViewController(order_id: "")
    }
    
    func verifyPayment(order_id: String) {
        print( "title:", "VERIFY PAYMENT", "message:" ,"Payment has to be verified by merchant for \(order_id)")
        let result = order_id
          
        guard let jsonData = try? JSONEncoder().encode(result),
              let jsonString = String(data: jsonData, encoding: .utf8) else {
            print("Error encoding JSON")
            return
        }
        dismissViewController(order_id: result)
        
       
//        self.createAlert(
//             title: "VERIFY PAYMENT", message: "Payment has to be verified by merchant for \(order_id)")
    }
    

    let pgService = CFPaymentGatewayService.getInstance()

    override func viewDidLoad() {
        super.viewDidLoad()
        pgService.setCallback(self)
        
        webCheckoutButtonTapped(sessionID,orderID)
        
//        pgService.setCallback(self)
        // Do any additional setup after loading the view.
    }
    
    
    @objc  func webCheckoutButtonTapped(_ sessionID: String, _ orderID: String) {
        do {
          let session = try CFSession.CFSessionBuilder()
            .setPaymentSessionId(sessionID)
            .setOrderID(orderID)
            .setEnvironment(.SANDBOX)
            .build()
          let webCheckoutPayment = try CFWebCheckoutPayment.CFWebCheckoutPaymentBuilder()
            .setSession(session)
            .build()
          try pgService.doPayment(webCheckoutPayment, viewController: self)
        } catch let e {
          let err = e as! CashfreeError
          print(err.description)
        }

      }

    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
