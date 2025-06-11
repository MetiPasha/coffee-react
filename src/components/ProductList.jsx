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
      .then((res) => {
        const listProducts = res.data.filter(
          (p) => p.category === "productList"
        );
        setProducts(listProducts);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-brand">
      <div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
        {products.map((product) => (
          <ProductListCard
            key={product.id}
            name={product.name}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
