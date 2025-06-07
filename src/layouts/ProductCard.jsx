import React from "react";
import Button from "./Button";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { BiSolidStarHalf } from "react-icons/bi";

const ProductCard = ({ title, image, price, rating, onAddToCart }) => {
  const fullStar = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStar = 5 - fullStar - (halfStar ? 1 : 0);

  return (
    <div className=" w-full lg:w-1/4 bg-white p-3 rounded-lg">
      <img
        className=" rounded-lg"
        src={new URL(`../assets/img/${image}`, import.meta.url).href}
        alt="img"
      />
      <div className=" flex flex-col items-center mt-5 gap-3">
        <h2 className=" font-semibold text-xl">{title}</h2>
        <div className=" flex">
          {[...Array(fullStar)].map((_, i) => (
            <BsStarFill key={"full" + i} className=" text-brand" />
          ))}
          {halfStar && <BiSolidStarHalf className=" text-brand" />}
          {[...Array(emptyStar)].map((_, i) => (
            <BsStar key={"empty" + i} className=" text-brand" />
          ))}
        </div>
        <h3 className=" font-semibold text-lg">{price}$</h3>
        <Button title="Add To Cart" onClick={onAddToCart} />
      </div>
    </div>
  );
};

export default ProductCard;
