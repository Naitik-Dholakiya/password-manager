import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { VaultProvider } from "./context/VaultContext";
import { ToastProvider } from "./context/ToastContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <VaultProvider>
    <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </VaultProvider>
);