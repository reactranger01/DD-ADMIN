import React from 'react';
import { Outlet } from 'react-router-dom';

function Reports() {
  return (
    <div className="items-center">
      <Outlet />
    </div>
  );
}

export default Reports;
