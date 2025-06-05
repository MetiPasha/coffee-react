import React, { useEffect, useState } from "react";
import img1 from "../assets/img/product1.jpg";
import img2 from "../assets/img/product2.jpg";
import img3 from "../assets/img/product3.jpg";
import ProductCard from "../layout/ProductCard";

const Products = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-brand">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">
        Our Products
      </h1>

      <div className=" flex flex-col lg:flex-row gap-12 justify-center">
        <ProductCard img={img1} title="Nespresso" rating={2} />
        <ProductCard img={img2} title="AeroPress" rating={3} />
        <ProductCard img={img3} title="Chemex" rating={4.5} />
      </div>
    </div>
  );
};

export default Products;
