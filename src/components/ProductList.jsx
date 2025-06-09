import React, { useEffect, useState } from "react";
import ProductListCard from "../layouts/ProductListCard";
import useStore from "../store/Store";
import api from "../utils/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductListCard
          key={product.id}
          product={product}
          onAddToCart={() => addToCart(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
