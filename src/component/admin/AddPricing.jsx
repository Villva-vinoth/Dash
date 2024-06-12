import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/AddPricing.css";
import { CREATE_PRICING } from "../services/ApiService";
import axios from "axios";

const AddPricing = () => {
  const [pricingData, setPricingData] = useState({
    vehicleType: "",
    baseFare: "",
    perKmFare: "",
    minimumFare: "",
    city: "",
    timeFare: "",
    waitingFare: "",
    peakFare: {
      from: "",
      to: "",
    },
  });

  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = async () => {
    const {
      vehicleType,
      baseFare,
      perKmFare,
      minimumFare,
      city,
      timeFare,
      waitingFare,
      peakFare,
    } = pricingData;

    if (
      !vehicleType ||
      !baseFare ||
      !perKmFare ||
      !minimumFare ||
      !city ||
      !timeFare ||
      !waitingFare ||
      !peakFare.from ||
      !peakFare.to
    ) {
      toast.error("Please enter all the fields!");
    } else {
      const token = localStorage.getItem("Token");
      setIsClicked(true);
      try {
        const response = await axios.post(CREATE_PRICING, pricingData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Submitted successfully!");
        setPricingData({
          vehicleType: "",
          baseFare: "",
          perKmFare: "",
          minimumFare: "",
          city: "",
          timeFare: "",
          waitingFare: "",
          peakFare: {
            from: "",
            to: "",
          },
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
    setPricingData({
      vehicleType: "",
      baseFare: "",
      perKmFare: "",
      minimumFare: "",
      city: "",
      timeFare: "",
      waitingFare: "",
      peakFare: {
        from: "",
        to: "",
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricingData({
      ...pricingData,
      [name]: value,
    });
  };

  const handlePeakFareChange = (e, type) => {
    setPricingData({
      ...pricingData,
      peakFare: {
        ...pricingData.peakFare,
        [type]: e.target.value,
      },
    });
  };

  return (
    <>
      <div className="add-pricing-container">
        <h1>Add Pricing</h1>
        <section className="add-pricing-sub-container">
          <div className="add-pricing-inputs-container">
            <div className="add-pricing-input-div">
              <select
                value={pricingData.vehicleType}
                name="vehicleType"
                onChange={handleInputChange}
              >
                <option value="">Select Vehicle Type</option>
                <option value="BIKE">Bike</option>
                <option value="EV_BIKE">Electronic Bike</option>
                <option value="AUTO">Auto</option>
                <option value="EV_AUTO">Electronic Auto</option>
                <option value="CAR">Car</option>
                <option value="EV_CAR">Electronic Car</option>
              </select>
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Base Fare"
                type="number"
                value={pricingData.baseFare}
                name="baseFare"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-pricing-input-div">
              <select
                value={pricingData.city}
                name="city"
                onChange={handleInputChange}
              >
                <option value="">Select City</option>
                <option value="madurai">MADURAI</option>
                <option value="coimbatore">COIMBATORE</option>
              </select>
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Minimum Fare"
                type="number"
                value={pricingData.minimumFare}
                name="minimumFare"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Per Km Fare"
                type="number"
                value={pricingData.perKmFare}
                name="perKmFare"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Time Fare"
                type="number"
                value={pricingData.timeFare}
                name="timeFare"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Waiting Fare"
                type="number"
                value={pricingData.waitingFare}
                name="waitingFare"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <h4 className="peak-fare">Peak Fare</h4>
            <div className="add-pricing-inputs-container">
              <div className="add-pricing-input-div">
                <input
                  type="datetime-local"
                  value={pricingData.peakFare.from}
                  onChange={(e) => handlePeakFareChange(e, "from")}
                />
              </div>
              <div className="add-pricing-input-div">
                <input
                  type="datetime-local"
                  value={pricingData.peakFare.to}
                  onChange={(e) => handlePeakFareChange(e, "to")}
                />
              </div>
            </div>
          </div>

          <div className="add-prod-btn">
            <button onClick={handleSubmit}> Add Pricing</button>
            <button onClick={handleReset}> Reset</button>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddPricing;
