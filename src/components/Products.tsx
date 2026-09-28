import ProductCard from "../layouts/ProductCard";
import LoadingSpinner from "../layouts/LoadingSpinner";
import ErrorMessage from "../layouts/ErrorMessage";
import useStore from "../store/Store";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

const Products = () => {
  const addToCart = useStore((state) => state.addToCart);
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProducts("productHome");

  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-brand">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">
        Our Products
      </h1>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorMessage
          message="Couldn't load products."
          onRetry={() => refetch()}
        />
      )}

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