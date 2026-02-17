import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./styles/index.css";
import App from "./App.jsx";
import PlantDetail from "./PlantDetail.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
        <Route path="https://perenual.com/" />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
