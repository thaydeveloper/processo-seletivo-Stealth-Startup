import Navbar from "../components/Navbar/NavBar";
import React, { ReactElement } from "react";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
