import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import LoadingSpinner from "./layouts/LoadingSpinner";
import ErrorBoundary from "./layouts/ErrorBoundary";

const ProductList = lazy(() => import("./components/ProductList"));
const Cart = lazy(() => import("./components/Cart"));
const Checkout = lazy(() => import("./components/Checkout"));
const OrderHistory = lazy(() => import("./components/OrderHistory"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand">
    <LoadingSpinner />
  </div>
);

const AppRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main>
                  <div id="home">
                    <Home />
                  </div>
                  <div id="menu">
                    <Menu />
                  </div>
                  <div id="about">
                    <About />
                  </div>
                  <div id="products">
                    <Products />
                  </div>
                  <div id="reviews">
                    <Reviews />
                  </div>
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
};

export default App;