import React, { Suspense } from "react";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";
import DashboardInicio from "@/components/AdminDashInicio/DashboardInicio";
import Loading from "./loading";

const adminPage = () => {
  return (
    <LayoutAdmin>
      <div>
        <Suspense fallback={<Loading />}>
          <DashboardInicio />
        </Suspense>
      </div>
    </LayoutAdmin>
  );
};

export default adminPage;
