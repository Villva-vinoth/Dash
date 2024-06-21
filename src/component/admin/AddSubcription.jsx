import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/AddPricing.css";
import { CREATE_SUBCRIPTION } from "../services/ApiService";
import axios from "axios";

const AddSubcription = () => {
    
  // {
  //     "name": "Super Value 499",
  //     "PackageValidity": "30",
  //     "credit":"50",
  //     "type":"driver"
  // }

  const [subcriptionData, setSubcriptionData] = useState({
    type: "",
    credit: "",
    PackageValidity: "",
    name: "",
  });

  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = async () => {
    const { type, credit, PackageValidity, name } = subcriptionData;

    if (!type || !credit || !PackageValidity || !name) {
      toast.error("Please enter all the fields!");
    } else {
      const token = localStorage.getItem("Token");
      setIsClicked(true);
      try {
        const response = await axios.post(CREATE_SUBCRIPTION, subcriptionData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Submitted successfully!");
        setSubcriptionData({
          type: "",
          credit: "",
          PackageValidity: "",
          name: "",
        });
      } catch (error) {
        console.error("error", error);
        toast.error("Submission failed!");
      } finally {
        setIsClicked(false);
      }
    }
  };

  const handleReset = () => {
    setSubcriptionData({
        type: "",
        credit: "",
        PackageValidity: "",
        name: "",
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubcriptionData({
      ...subcriptionData,
      [name]: value,
    });
  };

 

  return (
    <>
      <div className="add-pricing-container">
        <h1>Add Subcription</h1>
        <section className="add-pricing-sub-container">
          <div className="add-pricing-inputs-container">
          <div className="add-pricing-input-div">
              <input
                placeholder="Name"
                type="text"
                value={subcriptionData.name}
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-pricing-input-div">
              <select
                value={subcriptionData.type}
                name="type"
                onChange={handleInputChange}
              >
                <option value="">Select User Type</option>
                <option value="rider">Rider</option>
                <option value="driver">Driver</option>
                {/* <option value="AUTO">Auto</option>
                <option value="EV_AUTO">Electronic Auto</option>
                <option value="CAR">Car</option>
                <option value="EV_CAR">Electronic Car</option> */}
              </select>
            </div>
          
            
           
            <div className="add-pricing-input-div">
              <input
                placeholder="credit"
                type="number"
                value={subcriptionData.credit}
                name="credit"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Package Validity"
                type="number"
                value={subcriptionData.PackageValidity}
                name="PackageValidity"
                onChange={handleInputChange}
              />
            </div>
       
          </div>
        

          <div className="add-prod-btn">
            <button onClick={handleSubmit}> Add Subcription</button>
            <button onClick={handleReset}> Reset</button>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddSubcription;
