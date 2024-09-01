export interface CashfreePaymentGatewayPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  exampleMethod(options:{paymentSessionID:string,orderID:string}):Promise<any>;

}

export interface PaymentVerifiedEventData {
  orderId: string;
  message: string;
}

export interface PaymentFailedEventData {
  orderId: string;
  error: string;
}