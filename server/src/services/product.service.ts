import { Product } from '../models/Product.model';
import { IProduct, ICreateProductInput } from '../types/product.types';
import { IPaginatedResponse, ICursorPaginationRequest } from '../types/pagination.types';
import { PAGINATION_CONSTANTS } from '../constants/app.constants';

class ProductService {
  async getProducts(params: ICursorPaginationRequest): Promise<IPaginatedResponse<IProduct>> {
    const limit = Math.min(params.limit || PAGINATION_CONSTANTS.DEFAULT_LIMIT, PAGINATION_CONSTANTS.MAX_LIMIT);
    
    const query: Record<string, unknown> = {};

    if (params.cursor) {
      query._id = { $gt: params.cursor };
    }

    if (params.category) {
      query.category = params.category;
    }

    if (params.search) {
      query.name = { $regex: params.search, $options: 'i' };
    }

    const products = await Product
      .find(query)
      .sort({ _id: 1 })
      .limit(limit + 1)
      .lean();

    const hasMore = products.length > limit;
    const data = hasMore ? products.slice(0, limit) : products;
    const nextCursor = hasMore && data.length > 0 ? data[data.length - 1]._id.toString() : null;

    // Convert MongoDB documents to IProduct format
    const formattedData = data.map(product => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      createdAt: product.createdAt
    }));

    return {
      data: formattedData,
      pagination: {
        nextCursor,
        hasMore
      }
    };
  }

  async createProduct(input: ICreateProductInput): Promise<IProduct> {
    const product = new Product(input);
    const saved = await product.save();
    
    return {
      _id: saved._id.toString(),
      name: saved.name,
      description: saved.description,
      price: saved.price,
      category: saved.category,
      stock: saved.stock,
      createdAt: saved.createdAt
    };
  }

  async searchProducts(searchTerm: string): Promise<IProduct[]> {
    const products = await Product
      .find({ name: { $regex: searchTerm, $options: 'i' } })
      .limit(20)
      .lean();
    
    return products.map(product => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      createdAt: product.createdAt
    }));
  }
}

export const productService = new ProductService();