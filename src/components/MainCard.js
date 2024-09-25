import React from "react";
import ProductCard from "./ProductCard";
import { Spinner } from "flowbite-react";

export default function MainCard({ loading, items, setCartCount }) {
  const generateId = (category) => {
    return category?.toLowerCase().replace(/-/g, ""); // Remove only hyphens
  };

  return (
    <div className="text-center mt-6">
      {loading && <Spinner aria-label="Default status example" />}
      <i className="text-xl bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent font-semibold">
        {items[0]?.category.toUpperCase()}
      </i>
      {items && items.length > 0 ? ( // Check if electronics array exists and has items
        <div className="flex flex-wrap justify-center items-center gap-6">
          {items.map(
            (
              product // Correctly use map function
            ) => (
              <div
                key={product.name}
                className="text-center"
                id={generateId(product?.category)}
              >
                {" "}
                {/* Use a unique identifier as the key */}
                <ProductCard product={product} setCartCount={setCartCount} />
              </div>
            )
          )}
        </div>
      ) : (
        <p>No Items found.</p> // Optional: Message when no products are available
      )}
    </div>
  );
}
