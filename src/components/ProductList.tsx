import ProductListCard from "../layouts/ProductListCard";
import LoadingSpinner from "../layouts/LoadingSpinner";
import ErrorMessage from "../layouts/ErrorMessage";
import useStore from "../store/Store";
import { useProducts } from "../hooks/useProducts";

const ProductList = () => {
  const addToCart = useStore((state) => state.addToCart);
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProducts("productList");

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-brand">
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorMessage
          message="Couldn't load products."
          onRetry={() => refetch()}
        />
      )}

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