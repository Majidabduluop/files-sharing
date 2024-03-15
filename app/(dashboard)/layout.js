import React from "react";
import Header from "../_components/Header";
import SideNav from "./_components/SideNav";

function layout({ children }) {
  return (
    <div>
      <div className="h-full w-64 flex-col fixed z-50 inset-y-0">
        <SideNav />
      </div>
      <div className="ml-64">{children}</div>
    </div>
  );
}

export default layout;
