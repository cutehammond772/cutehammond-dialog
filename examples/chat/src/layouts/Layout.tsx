import * as React from "react";
import { styled } from "@linaria/react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const LayoutContainer = styled.div`
  min-height: 100vh;

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 4fr 1fr;
`;

export default function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <div></div>
      <Outlet />
      <div></div>
      <Footer />
    </LayoutContainer>
  );
}
