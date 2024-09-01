
export interface HelpRequest{
  order_id:string;
  query_title:string;
  query_description:string
}




export interface HelpTicketListResponse{
  order_id:string;
  query_status:string;
  query_title:string;
  feedback:string|null
}



export interface PartnerReview{
  service_provider_id:string,
  rating:number,
  review_text:string,
  user_id:string,
  order_id:string
}