//import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
//import { ShopContext } from "./contexts/ShopContext";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/productPage/ProductPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
//import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/registerPage/RegisterPage";

function App() {
  //const { accessToken } = useContext(ShopContext);
  return (
    <ErrorBoundary>
      {/*<Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>*/}
      <Navbar />
      <Cart />
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/*<Route
          path={`/${accessToken.accessToken}/homepage`}
          element={<HomePage />}
        />*/}
        <Route path={`/product/*`} element={<ProductPage />} />
        {/*<Route
          path={`/${accessToken.accessToken}/productpage/*`}
          element={<ProductPage />}
        />*/}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
