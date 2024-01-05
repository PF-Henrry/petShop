import React from 'react';
import Sidebar from '../sideBarAdmin/sideBarAdmin';

const LayoutAdmin = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;