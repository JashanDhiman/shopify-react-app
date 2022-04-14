import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/productpage/*" element={<ProductPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
