import { GetServerSideProps } from "next";
import { useState } from "react";
import { apiService } from "../src/services/api.service";
import { IProduct, IPaginationResponse, ProductCategory } from "../src/types/product.types";
import { ProductList } from "../src/components/ProductList";
import { AddProductForm } from "../src/components/AddProductForm";
import { useInfiniteProducts } from "../src/hooks/useInfiniteProducts";

// ... rest of the code stays the same

interface HomeProps {
  initialResponse: IPaginationResponse;
}

export default function Home({ initialResponse }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<IProduct[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>();

  const { products, loadMore, hasMore, loading } = useInfiniteProducts(
    initialResponse.data
  );

  // Display either search results or paginated products
  const displayProducts = searchResults !== null ? searchResults : products;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await apiService.searchProducts(searchQuery);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults(null);
  };

  const handleProductAdded = async () => {
    // Refresh page to show new product
    window.location.reload();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as ProductCategory | "";
    setSelectedCategory(category || undefined);
    handleClearSearch();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Product Management System</h1>

      {/* Add Product Form */}
      <AddProductForm onProductAdded={handleProductAdded} />

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "16px" }}>
        <form onSubmit={handleSearch} style={{ marginBottom: "12px" }}>
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: "8px", padding: "8px" }}
          />
          <button type="submit" disabled={searching} style={{ padding: "8px 16px" }}>
            {searching ? "Searching..." : "Search"}
          </button>
          {searchResults !== null && (
            <button
              type="button"
              onClick={handleClearSearch}
              style={{ marginLeft: "8px", padding: "8px 16px" }}
            >
              Clear Search
            </button>
          )}
        </form>

        {/* Category Filter */}
        <div>
          <label style={{ marginRight: "8px" }}>Filter by Category: </label>
          <select
            value={selectedCategory || ""}
            onChange={handleCategoryChange}
            style={{ padding: "8px" }}
          >
            <option value="">All Categories</option>
            <option value="ELECTRONICS">Electronics</option>
            <option value="CLOTHING">Clothing</option>
            <option value="BOOKS">Books</option>
            <option value="FOOD">Food</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <ProductList
        initialProducts={initialResponse.data}
        onLoadMore={() => loadMore(selectedCategory)}
        hasMore={hasMore && searchResults === null}
        loading={loading}
        currentProducts={displayProducts}
      />
    </div>
  );
}

// Server-Side Rendering - Fetch initial products on server
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const response = await fetch(`${apiUrl}/api/products?limit=10`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const initialResponse: IPaginationResponse = await response.json();

    return {
      props: {
        initialResponse,
      },
    };
  } catch (error) {
    console.error("Failed to fetch initial products:", error);

    // Return empty data instead of notFound
    return {
      props: {
        initialResponse: {
          data: [],
          pagination: {
            nextCursor: null,
            hasMore: false,
          },
        },
      },
    };
  }
};