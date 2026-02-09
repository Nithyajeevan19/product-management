import { ProductCategory } from '../constants/app.constants';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  createdAt: Date;
}

export interface ICreateProductInput {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
}