import Sidebar from "@/components/sideBarAdmin/sideBarAdmin";
import React from "react";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="flex flex-row gap-6  w-full bg-[#fffaf2]">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default LayoutAdmin;
