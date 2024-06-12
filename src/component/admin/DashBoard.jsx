import Lottie from "lottie-react";
import React from "react";
import lottieData from "../Asset/carLoader.json";
import './css/dashboard.css'
const DashBoard = () => {
  return (
    <div className="dashboard-cont">
      <div className="dashboard-Lottie">
        <Lottie animationData={lottieData} />
        
      </div>
      <h1 style={{textAlign:'center'}}> Welcome to _company_name </h1>
    </div>
  );
};

export default DashBoard;
