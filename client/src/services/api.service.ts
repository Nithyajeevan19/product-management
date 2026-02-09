import axios from "axios";
import { IPaginationResponse, IProduct, ProductCategory } from "../types/product.types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
});

export const apiService = {
  // Get products with cursor pagination
  async getProducts(
    cursor?: string,
    limit: number = 10,
    category?: ProductCategory
  ): Promise<IPaginationResponse> {
    const params = new URLSearchParams();
    if (cursor) params.append("cursor", cursor);
    params.append("limit", limit.toString());
    if (category) params.append("category", category);

    const response = await apiClient.get(`/api/products?${params.toString()}`);
    return response.data;
  },

  // Search products
  async searchProducts(query: string): Promise<{ data: IProduct[] }> {
    const response = await apiClient.get(`/api/products/search?q=${query}`);
    // Backend returns array directly, wrap it in data object
    return { data: response.data };
  },

  // Create product
  async createProduct(product: {
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number;
  }): Promise<IProduct> {
    const response = await apiClient.post("/api/products", product);
    return response.data;
  },
};