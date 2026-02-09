import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import { HttpStatus } from '../constants/app.constants';

class ProductController {
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const { cursor, limit, category, search } = req.query;

      const result = await productService.getProducts({
        cursor: cursor as string,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        category: category as string,
        search: search as string
      });

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        message: 'Failed to fetch products' 
      });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.createProduct(req.body);
      res.status(HttpStatus.CREATED).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(HttpStatus.BAD_REQUEST).json({ 
        message: 'Failed to create product' 
      });
    }
  }

  async searchProducts(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      
      if (!q) {
        res.status(HttpStatus.BAD_REQUEST).json({ 
          message: 'Search query is required' 
        });
        return;
      }

      const products = await productService.searchProducts(q as string);
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        message: 'Failed to search products' 
      });
    }
  }
}

export const productController = new ProductController();