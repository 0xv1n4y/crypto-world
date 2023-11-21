import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";

import Indicator from "./components/Alert/Indicator";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CoinPage = lazy(() => import("./pages/CoinPage/CoinPage"));

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Header />

        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coin/:id" element={<CoinPage />} />
          </Routes>
        </Suspense>
      </div>
      <Indicator />
    </BrowserRouter>
  );
}

export default App;
