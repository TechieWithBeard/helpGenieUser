package com.helpgenie.helpgenie;
import android.util.Log;
import android.widget.Toast;
import com.cashfree.pg.core.api.CFSession;
import com.cashfree.pg.core.api.callback.CFCheckoutResponseCallback;
import com.cashfree.pg.core.api.exception.CFException;
import com.cashfree.pg.core.api.exception.CFInvalidArgumentException;
import com.cashfree.pg.core.api.utils.CFErrorResponse;
import com.cashfree.pg.core.api.webcheckout.CFWebCheckoutPayment;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.cashfree.pg.api.CFPaymentGatewayService;


@CapacitorPlugin(name = "PaymentCF")
public class PaymentCFPlugin extends Plugin implements CFCheckoutResponseCallback {

  private static String callbackID;
    private PaymentCF implementation = new PaymentCF();

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }

      @PluginMethod
  public void exampleMethod(PluginCall call) throws CFInvalidArgumentException {
    String paymentSessionID = call.getString("paymentSessionID");
    String orderID = call.getString("orderID");
    assert paymentSessionID != null;
    assert orderID != null;

    try {
      CFSession cfSession = new CFSession.CFSessionBuilder()
        .setEnvironment(CFSession.Environment.SANDBOX)
        .setPaymentSessionID(paymentSessionID)
        .setOrderId(orderID)
        .build();

      CFWebCheckoutPayment cfWebCheckoutPayment = new CFWebCheckoutPayment.CFWebCheckoutPaymentBuilder()
        .setSession(cfSession)
        .build();
      CFPaymentGatewayService.getInstance().setCheckoutCallback(this);


      Log.d("CashfreePaymentGateway", call.getCallbackId());
      callbackID = call.getCallbackId();
      call.setKeepAlive(true);
      getBridge().saveCall(call);
      CFPaymentGatewayService.getInstance().doPayment(getContext(), cfWebCheckoutPayment);
    } catch (CFException e) {
      call.reject("Message is required");
      throw new RuntimeException(e);
    }
  }


  @Override
  public void onPaymentVerify(String orderID) {
    // Your implementation
    try {
      JSObject ret = new JSObject();
      ret.put("value", orderID);
      showToast(orderID);

      PluginCall savedCall = getBridge().getSavedCall(callbackID);
      if (savedCall != null) {
//
//      savedCall.release(getBridge());

        Log.d("CF::SDK::Android", "Response : " + ret.toString());
        savedCall.resolve(ret);
        savedCall.release(getBridge());
        savedCall.setKeepAlive(false);
        callbackID = null;
        System.gc();

      }
    }
      catch (Exception ex){
        Log.d("CF::SDK::Android", "Response : " + ex.toString());
    }



  }

  @Override
  public void onPaymentFailure(CFErrorResponse cfErrorResponse, String orderID) {
    // Your implementation
    JSObject ret = new JSObject();
    ret.put("value", orderID);
    showToast(orderID);

    PluginCall savedCall = getBridge().getSavedCall(callbackID);
    if (savedCall != null) {
//      savedCall.resolve(ret);
      savedCall.release(getBridge());
      Log.d("CF::SDK::Android", "Response : " + ret.toString());
      savedCall.resolve(ret);
      callbackID = null;
    }
  }
  private void showToast(String message) {
    Toast.makeText(getContext(), message, Toast.LENGTH_SHORT).show();
  }
}
