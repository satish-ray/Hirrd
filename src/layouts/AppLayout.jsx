import React from "react";
import "../App.css";
import Header from "../components/header";

import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      {/* //margin to be re evaluated */}
      <main className="min-h-screen container p-4 mx-auto">
        <h1>App Layout</h1>
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with &#x2764; by Satish
      </div>
    </div>
  );
};

export default AppLayout;
