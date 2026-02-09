import { IProduct } from "../types/product.types";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "16px" }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
    </div>
  );
};
