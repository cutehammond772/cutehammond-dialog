import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { DialogProvider } from "@cutehammond/dialog-core";

import App from "./app";
import { area } from "./global";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DialogProvider layout={area}>
    <App />
  </DialogProvider>
);
