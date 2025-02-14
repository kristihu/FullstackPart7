// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Tuodaan Provider
import App from "./App";
import store from "./store"; // Tuodaan store

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* Kääritään sovellus Provideriin */}
    <App />
  </Provider>
);
