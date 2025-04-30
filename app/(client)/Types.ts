export type Product = {
  ProductId: number | string;
  categoryId: number;
  ProductTypeId: number;
  name: string;
  productInto: string;
  Description: string;
  ProductPrice: number;
  DiscountPrice: number;
  Stock: number;
  ProductStatus: "Hot" | "New";
  imageName: string[];
  imageUrl: string[];
  isDeleted: boolean;
  category:string;
  ProductType:string
};


export type TnewProduct = {
  id:string,
  productId:string,
  name:string,
  price:number,
  quantity:number,
  orderId:number,
  product:{
    ProductId: number | string;
    categoryId: number;
    ProductTypeId: number;
    name: string;
    productInto: string;
    Description: string;
    ProductPrice: number;
    DiscountPrice: number;
    Stock: number;
    ProductStatus: "Hot" | "New";
    imageName: string[];
    imageUrl: string[];
    isDeleted: boolean;
    category:string;
    ProductType:string
  }
};

export type CategoriesData = {
  CategoryId:number,
  title:string,
  description:string,
  imageName:string,
  imageUrl:string,
  isDeleted:boolean
}

type TInvoice = {
  id:number,
  invoiceId:string,
  number:string,
  hostedInvoiceUrl:string
}


export type TOrders = {
  id:string,
  orderNumber:string,
  invoiceId:string,
  createdAt: string,
  updatedAt: string
  stripeCustomerId:string,
  clerkUserId:string,
  customerName:string,
  email:string,
  stripeCheckoutSessionId:string,
  stripePaymentIntentId:string,
  currency:string,
  amountDiscount:number,
  totalPrice:number,
  status:string,
  products:TnewProduct[],
  invoice:TInvoice
}
