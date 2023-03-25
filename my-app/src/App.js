import React from "react";
import Component from "./Components/Component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderPage from "./Components/OrderPage";
// import "./App.css";

function App() {
  return (
    // <div className="App">
    //   <Component />
    // </div>
    <BrowserRouter>
      <div style={{ backgroundColor: "#1D2228", color: "whitesmoke" }}>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/orderpage" element={<OrderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
