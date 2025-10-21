import React from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import "./AppLayout.css";
import Header from "../components/header";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header/>
        <Outlet />
      </main>
      <div className="p10 text-center bg-gray-800 mt-10">Made with &#x2764; by Satish</div>
    </div>
  );
};

export default AppLayout;
