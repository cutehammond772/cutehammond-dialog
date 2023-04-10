import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { css } from "@linaria/core";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { DialogProvider } from "@cutehammond/dialog-core";

import GlobalThemeProvider from "./components/GlobalThemeProvider";

import Layout from "./layouts/Layout";
import IndexPage from "@pages/IndexPage";
import SettingsPage from "@pages/SetingsPage";
import ChatPage from "@pages/ChatPage";

const layout = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  & * {
    pointer-events: initial;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="chat/:chatid" element={<ChatPage />} />
    </Route>
  )
);

root.render(
  <GlobalThemeProvider>
    <DialogProvider layout={layout}>
      <RouterProvider router={router} />
    </DialogProvider>
  </GlobalThemeProvider>
);
