//import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
//import { ShopContext } from "./contexts/ShopContext";
import HomePage from "./pages/HomePage";
//import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  //const { accessToken } = useContext(ShopContext);
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
        {/*<Route
          path={`/${accessToken.accessToken}/homepage`}
          element={<HomePage />}
        />*/}
        <Route path={`/productpage/*`} element={<ProductPage />} />
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
