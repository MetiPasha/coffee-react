import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BsStar, BsStarFill } from "react-icons/bs";
import { BiSolidStarHalf } from "react-icons/bi";

const ProductListCard = ({ product, onAddToCart }) => {
  const fullStar = Math.floor(product.rating);
  const halfStar = product.rating % 1 >= 0.5;
  const emptyStar = 5 - fullStar - (halfStar ? 1 : 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={new URL(`../assets/img/${product.image}`, import.meta.url).href}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <div className="flex items-center gap-1 mt-2">
          {[...Array(fullStar)].map((_, i) => (
            <BsStarFill key={"f" + i} className="text-yellow-500" />
          ))}
          {halfStar && <BiSolidStarHalf className="text-yellow-500" />}
          {[...Array(emptyStar)].map((_, i) => (
            <BsStar key={"e" + i} className="text-yellow-500" />
          ))}
        </div>
        <p className="mt-2 font-semibold">${product.price}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductListCard;
