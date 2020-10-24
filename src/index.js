import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { FavProvider } from "./components/favorites/favorites-context";


import App from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <FavProvider>
      <Router>
        <ThemeProvider>
          <CSSReset />
          <App />
        </ThemeProvider>
      </Router>
    </FavProvider>
  </React.StrictMode>,
  document.getElementById("root")
);