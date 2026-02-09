import { ProductCard } from "./ProductCard";
import { IProduct } from "../types/product.types";

interface ProductListProps {
  initialProducts: IProduct[];
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  currentProducts: IProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({
  currentProducts,
  onLoadMore,
  hasMore,
  loading,
}) => {
  return (
    <div>
      <h2>Products</h2>

      {currentProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

          {hasMore && (
            <button
              onClick={onLoadMore}
              disabled={loading}
              style={{
                padding: "10px 20px",
                marginTop: "20px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
};


