import mongoose, { Schema, Document } from 'mongoose';
import { ProductCategory } from '../constants/app.constants';

interface IProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  createdAt: Date;
}

const productSchema = new Schema<IProductDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: Object.values(ProductCategory),
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Product = mongoose.model<IProductDocument>('Products_collection', productSchema);