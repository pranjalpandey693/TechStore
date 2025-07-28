import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
