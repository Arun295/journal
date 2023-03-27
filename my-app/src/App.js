import React from "react";
import Component from "./Components/Component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderPosition from "./Components/OrderPosition";
import "./App.css";

function App() {
  return (
    // <div className="App">
    //   <Component />
    // </div>
    <BrowserRouter>
      <div class="App-main">
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/orderpage" element={<OrderPosition />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
