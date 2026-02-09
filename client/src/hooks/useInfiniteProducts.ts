import { useState, useCallback, useEffect } from "react";
import { apiService } from "../services/api.service";
import { IProduct, ProductCategory } from "../types/product.types";

export const useInfiniteProducts = (initialProducts: IProduct[]) => {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const loadMore = useCallback(async (category?: ProductCategory) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await apiService.getProducts(cursor || undefined, 10, category);
      setProducts((prev) => [...prev, ...response.data]);
      setCursor(response.pagination.nextCursor);
      setHasMore(response.pagination.hasMore);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, loading]);

  return { products, loadMore, hasMore, loading };
};