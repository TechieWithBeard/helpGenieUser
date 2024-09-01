import { UserAddress } from "src/app/data-model/category.model";

interface ServiceUser {
    user_name?: string;
    user_email?: string;
    user_phone?: number | null;
    user_address?: Record<string, any> | null;
    user_image?: string | null;
    user_id?: string | null;
  }


  export interface Coordinates{
    lat:number,
    lng:number
  }
  




  export interface StripeLineItem {
    price_data: {
      currency: string;
      product_data: {
        name: string;
      };
      unit_amount: number;
    };
    quantity: number;
    tax_rates?: string[],
  }
  
  export  interface StripeMetadata {
    order_id: string;
  }
  
  export  interface StripeData {
    line_items: StripeLineItem[];
    metadata: StripeMetadata;
    mode: string;
    success_url: string;
    cancel_url: string;
  }






export interface ServiceOrderData {
  order_value?: number | null;
  order_items?: Record<string, any> | null;
  order_provider_value:number;
  order_user_id: string;
  order_genie_id: string;
  order_date?: Date | null;
  order_status?: string | null;
  order_payment_id?: string | null;
  order_address?: Record<string, any> | null;
  order_short_id?:string,
  completition_code?:number
}


export interface UserCheckoutData {
  id: number
  created_at: string
  user_name: string
  user_email: string
  user_phone: number
  user_address: UserAddress[]
  user_image: string
  user_id: string
}









export interface OrderDBResponse {
  id: number
  created_at: string
  order_id: string
  order_value: number
  order_items: OrderItem[]
  order_user_id: string
  order_genie_id: string
  order_date: string
  order_status: string
  order_payment_id: any
  order_address: OrderAddress
}

export interface OrderItem {
  id: number
  rate: number
  count: number
  per_charge: boolean
  total_price: number
  service_name: string
}

export interface OrderAddress {
  user_address: string
  user_pincode: number
  user_address_tag: string
  user_coordinates: UserCoordinates
  user_nearby_landmark: string
}

export interface UserCoordinates {
  lat: number
  lng: number
}







export interface nearByCategory{
  service_provider_category:string
}






export interface CashfreeCreateOrderBody {
  customer_details: CustomerDetails
  order_meta: OrderMeta|null
  order_amount: number|null|undefined
  order_currency: string
  order_id:string
}

export interface CustomerDetails {
  customer_id: string
  customer_email: string
  customer_phone: string
}

export interface OrderMeta {
  notify_url?: string
  return_url?:string
  payment_methods?:string

}





export interface TaxData {
  Tax: number
  service_charge: number
  vendor_commission: number
  referral_commission: number
}






export interface ServiceProviderServiceData {
  id: number;
  service_provider_name: string; // service_provider_name AS name
  service_provider_category: string;
  lat: number; // ST_Y(service_provider_supa_location::geometry)
  long: number; // ST_X(service_provider_supa_location::geometry)
  dist_meters: number; // ST_Distance(service_provider_supa_location::geography, ST_MakePoint(long, lat)::geography)
  service_provider_domain?: ServiceProviderDomain[] | null;
  service_provider_image?: string | null;
  service_provider_id: string;
  consultation_fees: number;
  total_service_completed:number;
  service_provider_rating:number;
  service_provider_experience:number
}



interface ServiceProviderDomain {
  id: string;
  rate: number;
  enabled: boolean;
  verified: boolean;
  service_name: string;
  service_description: string;
  count?:number
}




interface OrderItemStatus {
  id: string;
  rate: number;
  count: number;
  enabled: boolean;
  verified: boolean;
  total_price: number;
  service_name: string;
  service_description: string;
}

export interface OrderData {
  order_id: string;
  order_date: string;
  order_value: number;
  order_items: OrderItemStatus[];
  order_genie_id: string;
  order_status: string;
  order_payment_status: string;
  order_short_id: string;
  completition_code: number;
  order_completition_date: string;
  order_provider_value: number;
}
