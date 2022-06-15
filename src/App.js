//import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Rough from "./components/Rough";
//import { ShopContext } from "./contexts/ShopContext";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/productPage/ProductPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
//import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import ResetPassPage from "./pages/ResetPassPage";

function App() {
  //const { accessToken } = useContext(ShopContext);
  return (
    <ErrorBoundary>
      {/*<Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>*/}
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/reset-pass" element={<ResetPassPage />} />
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

        <Route path="/rough" element={<Rough />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
