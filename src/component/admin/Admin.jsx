import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import NavBar from "./NavBar";
import "./css/Admin.css";
import Header from "./Header";
import AddPricing from "./AddPricing";
import ManagePricing from "./ManagePricing";
import Profile from "./Profile";
import PageNotFound from "../PageNotFound";
import AddCab from "./AddCab";
const Admin = () => {
  return (
    <div className="admin-cont">
      <div>
        <Header />
      </div>
      <div className="admin-main-contain">
        <div className="admin-first-child">
          <NavBar />
        </div>
        <div className="admin-second-child">
          <div className="admin-Router-child">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/pricing/add" element={<AddPricing />} />
              <Route path="/pricing/manage" element={<ManagePricing />} />
              <Route path="/cab/add" element={<AddCab />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;