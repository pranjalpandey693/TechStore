import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
     <App/>
     <Toaster richColors position="top-center"/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
