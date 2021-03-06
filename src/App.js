//import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Rough from "./components/Rough";
import CartPage from "./pages/cartPage/CartPage";
import VegitableSeeds from "./pages/collections/seeds/VegitableSeeds";
//import { ShopContext } from "./contexts/ShopContext";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/productPage/ProductPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
//import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import ResetPassPage from "./pages/ResetPassPage";
import WishListPage from "./pages/WishListPage/WishListPage";

function App() {
  //const { accessToken } = useContext(ShopContext);
  return (
    <ErrorBoundary>
      {/*<Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>*/}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-pass" element={<ResetPassPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/*<Route
          path={`/${accessToken.accessToken}/homepage`}
          element={<HomePage />}
        />*/}
        <Route path={`/cart`} element={<CartPage />} />
        <Route path={`/product/*`} element={<ProductPage />} />
        <Route path={`/collections/veg`} element={<VegitableSeeds />} />
        <Route path={`/wishlist`} element={<WishListPage />} />
        {/*<Route
          path={`/${accessToken.accessToken}/productpage/*`}
          element={<ProductPage />}
        />*/}

        <Route path="/rough" element={<Rough />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
