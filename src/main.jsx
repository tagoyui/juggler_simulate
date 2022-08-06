import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import "bulma/css/bulma.css";

createRoot(document.querySelector("#content")).render(<App />);
