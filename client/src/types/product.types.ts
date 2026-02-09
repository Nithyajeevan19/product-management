export enum ProductCategory {
  ELECTRONICS = "ELECTRONICS",
  CLOTHING = "CLOTHING",
  BOOKS = "BOOKS",
  FOOD = "FOOD",
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  createdAt: string;
}

export interface IPaginationResponse {
  data: IProduct[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}
