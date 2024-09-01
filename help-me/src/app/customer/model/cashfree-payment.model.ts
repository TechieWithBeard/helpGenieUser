export interface CashfreeResponse {
    cf_order_id: number
    created_at: string
    customer_details: CustomerDetails
    entity: string
    order_amount: number
    order_currency: string
    order_expiry_time: string
    payment_session_id:string
    order_id: string
    order_meta: OrderMeta
    order_note: any
    order_splits: any[]
    order_status: string
    order_tags: any
    order_token: string
    payment_link: string
    payments: Payments
    refunds: Refunds
    settlements: Settlements
  }
  
  export interface CustomerDetails {
    customer_id: string
    customer_name: any
    customer_email: string
    customer_phone: string
  }
  
  export interface OrderMeta {
    return_url: any
    notify_url: string
    payment_methods: any
  }
  
  export interface Payments {
    url: string
  }
  
  export interface Refunds {
    url: string
  }
  
  export interface Settlements {
    url: string
  }
  