import { Coordinates } from "../customer/model/user-data.model";

export interface Category{
    id: string;
    name: string;
    display_name: string;
    image: string;
    description: string;
    active: boolean;
    subcategories: string[];
    nearby?:boolean

}



export interface UserData{
    user_name: string ; // character varying (nullable)
    user_email: string ; // character varying (nullable)
    user_phone: number ; // numeric (nullable)
    user_address: UserAddress[]; // jsonb (nullable)
    user_image?: string; // character varying (nullable)
    user_id:string;
    user_referral_id?:string;
    user_referred_by_id?:string;
    user_type:string;
}

export interface UserAddress{
    user_address_id:string;
    user_phone?:number;
    user_coordinates:Coordinates
    user_address:string
    user_pincode:string|null
    user_nearby_landmark:string|null
    user_address_tag:"Home"|"Office"|"Other"
    default?:boolean
}








interface PlaceAddress {
    village: string;
    county: string;
    state_district: string;
    state: string;
    ISO3166_2_lvl4: string;
    postcode: string;
    country: string;
    country_code: string;
  }
  
  export interface Place {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: PlaceAddress;
    boundingbox: [string, string, string, string];
  }
  