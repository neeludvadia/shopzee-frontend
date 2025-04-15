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

export type CategoriesData = {
  CategoryId:number,
  title:string,
  description:string,
  imageName:string,
  imageUrl:string,
  isDeleted:boolean
}
