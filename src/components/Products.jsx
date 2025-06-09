import React, { useEffect, useState } from "react";
import ProductCard from "../layouts/ProductCard";
import api from "../utils/axios";
import useStore from "../store/Store";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-brand">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">
        Our Products
      </h1>

      <div className=" flex flex-col lg:flex-row gap-12 justify-center">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            title={item.name}
            image={item.image}
            price={item.price}
            rating={item.rating}
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/productList">
          <button className="mt-20 border-6 border-amber-300 px-2 py-1 rounded-2xl hover:bg-amber-300 text-2xl font-bold cursor-pointer ">
            See All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
