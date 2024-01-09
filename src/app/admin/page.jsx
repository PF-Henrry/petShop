import React from "react";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";
import DashboardInicio from "@/components/AdminDashInicio/DashboardInicio";

const adminPage = () => {
  return (
    <LayoutAdmin>
      <div>
      
        <DashboardInicio />
       
      </div>
    </LayoutAdmin>
  );
};

export default adminPage;
