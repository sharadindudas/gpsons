export interface ApiResponse<ResData = undefined> {
  success: boolean;
  message: string;
  data?: ResData;
}

export interface ITestimonial {
  id: number;
  name: string;
  link: string;
  review: string;
}

export interface IUser {
  userid: string;
  user_type: number;
  name: string;
  email: string;
  phone: string;
  addresses: string[];
  orders: string[];
  wishlist: string[];
  verified: {
    email: boolean;
    phone: boolean;
  };
  token?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  productid: string;
  title: string;
  desc: string;
  longdesc: string;
  categoryid: string;
  subcategoryid: string;
  price: number;
  code: string;
  offer: number;
  tag: number;
  gst: number;
  size: string;
  color: string;
  images: string[];
  inStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductMetadata {
  colors: string[];
  sizes: string[];
  count: number;
}

export interface ICart {
  productid: string;
  title: string;
  price: number;
  code: string;
  size: string;
  color: string;
  images: string[];
  inStock: number;
  quantity: number;
  total: number;
}

export interface IPincode {
  city: string[];
  district: string[];
  state: string[];
  postoffice: string[];
}

export interface IPostOffice {
  name: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
}

export interface IAddress {
  addressid: string;
  name: string;
  houseno: string;
  street: string;
  postoffice: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  landmark: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  orderid: string;
  items: [
    {
      productid: string;
      quantity: number;
      price: number;
    }
  ];
  payment: {
    tracking_id: string;
    bank_ref_no: string;
    order_status: string;
    payment_mode: string;
    status_message: string;
    trans_date: string;
  };
  order_total: number;
  delivery_charge: number;
  billing_address: string;
  shipping_address: string;
  post_tracking_id: null;
  createdAt: string;
  updatedAt: string;
}

export interface IWishlist {
  desc: string;
  productid: string;
  title: string;
  price: number;
  code: string;
  images: string[];
}

export interface IAttachment {
  path: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
