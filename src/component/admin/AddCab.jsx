import React, { useRef, useState } from "react";
import "./css/addCab.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { ADD_PRODUCT } from '../../../../apiServices';
import { useNavigate } from "react-router-dom";

const AddCab = () => {
  const fileInput = useRef(null);
  const nav = useNavigate();

  //   "manufacturer": "SKODA", -
  //   "vehicleType": "CAR", -
  //   "vehicleName": "SKODA RAPID", -
  //   "vehicleModel": "RAPID", -
  //   "vehicleModelYear": "2024", -
  //   "vehicleModelSubName": "RAPID", -
  //   "vehicleCapacity": "5", -
  //   "transmissionType": "Bs-6", -
  //   "fueltype": "PETROL", -
  //   "kmpl": "18", -
  //   "comfortLevel": "Luxury", -
  //   "safetyRate": "5", -
  //   "errorRate": "2", -
  //   "fileUploadURL": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fvehicle%2F&psig=AOvVaw0YVryljtOOkQvRwRZDOsmh&ust=1712138652112000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMik19Ojo4UDFQAAAAAdAAAAABAE",
  //   "fileUploadURL1":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtGHMRuj9GT5umQ6LyFGEHVN5yNI9sWeQmHk0uu6CABzIvgPaIY2p1eL1FRIC8s9MplME&usqp=CAU",
  //   "image3":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtGHMRuj9GT5umQ6LyFGEHVN5yNI9sWeQmHk0uu6CABzIvgPaIY2p1eL1FRIC8s9MplME&usqp=CAU",
  //   "status": "Active",
  //   "vehicleNumber": "TN91AS1616" -

  const [cab, setcab] = useState({
    user_id: 1,
    vehicleName: "",
    product_image: "",
    product_description: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleModelYear: "",
    vehicleModelSubName: "",
    manufacturer: "",
    vehicleCapacity: "",
    transmissionType: "",
    kmpl: "",
    fueltype: "",
    comfortLevel: "",
    safetyRate: "",
    errorRate: "",
    vehicleNumber: "",
    peak_current: "",
    status: "",
    operating_mode: "",
  });
  const [image, setImage] = useState(0);
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setcab({ ...cab, [e.target.name]: file });
    }
  };

  const resetProduct = () => {
    setcab({
      ...cab,
      vehicleName: "",
      product_image: "",
      product_description: "",
      vehicleType: "",
      vehicleModel: "",
      vehicleModelYear: "",
      vehicleModelSubName: "",
      manufacturer: "",
      vehicleCapacity: "",
      transmissionType: "",
      kmpl: "",
      fueltype: "",
      comfortLevel: "",
      safetyRate: "",
      errorRate: "",
      vehicleNumber: "",
      peak_current: "",
      status: "",
      operating_mode: "",
    });
    setImage("");
    if (fileInput) {
      fileInput.current.value = null;
    }
  };
  const handleValidation = () => {
    const { vehicleName, product_image, product_description } = cab;

    if (vehicleName == "") {
      toast.error(" Product Name Should Not be Empty!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    if (product_image == "") {
      toast.error(" Please upload Product Image!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    if (product_description == "") {
      toast.error(" Product Description Should Not be Empty!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        limit: 1,
      });
      return false;
    }

    return true;
  };

  const handleAddProduct = async () => {
    const formData = new FormData();

    for (let key in cab) {
      formData.append(key, cab[key]);
    }
    console.log(formData);
    if (handleValidation()) {
      const accessToken = localStorage.getItem("Token");
      console.log("token product", accessToken);
      //   await axios.post(ADD_PRODUCT,formData,{
      //     headers:{
      //       Authorization:`Bearer ${accessToken}`
      //     }
      //   }).then((res) => {
      //     if (res) {
      //       toast.success(' Added Succefully  !', {
      //         position: "top-right",
      //         autoClose: 3000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "dark",

      //       });
      //       resetProduct();
      //       nav("/admin/products")
      //     }
      //   }).catch((err) => {
      //     console.log(err)
      // })
    }
  };
  return (
    <div className="add-pro">
      <div className="wrapper-container">
        <h2 className="add-cab">Add Cab</h2>
        <div className="product-form">
          <input
            type="text"
            value={cab.vehicleName}
            name="vehicleName"
            className="vehicleName"
            placeholder="Vehicle Name"
            onChange={(e) => {
              setcab({ ...cab, [e.target.name]: e.target.value });
            }}
          />

          {image ? <img src={image} /> : ""}

          <input
            type="file"
            accept="image/*"
            name="product_image"
            ref={fileInput}
            onChange={(e) => handleUploadImage(e)}
          />

          {/* <textarea className='text-area' rows={5}
            name='product_description'
            placeholder='Product description'
            value={cab.product_description}
            onChange={(e) => { setcab({ ...cab, [e.target.name]: e.target.value }) }} /> */}

          <div className="product-form-field">
            <div className="product-rows">
              <label>Vehicle Type :</label>
              {/* <input type='text'
                value={cab.vehicleType}
                name='vehicleType'
                onChange={(e) => { setcab({ ...cab, [e.target.name]: e.target.value }) }} /> */}
              <select
                value={cab.vehicleType}
                name="vehicleType"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
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
            <div className="product-rows">
              <label>status :</label>
              <select
                value={cab.status}
                name="status"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              >
                <option value="">Select Vehicle Status</option>
                <option value="Active">Active</option>
                <option value="InActive">In Active</option>
              </select>
            </div>
          </div>

          <div className="product-form-field">
            <div className="product-rows">
              <label> Safety Rate:</label>
              <input
                type="text"
                value={cab.safetyRate}
                name="safetyRate"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>

            <div className="product-rows">
              <label> Error Rate :</label>
              <input
                type="text"
                value={cab.errorRate}
                name="errorRate"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="product-form-field">
            <div className="product-rows">
              <label>Vehicle Model :</label>
              <input
                type="text"
                value={cab.vehicleModel}
                name="vehicleModel"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>

            <div className="product-rows">
              <label> Vehicle Model Year :</label>
              <input
                type="text"
                value={cab.vehicleModelYear}
                name="vehicleModelYear"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="product-form-field">
            <div className="product-rows">
              <label>Vehicle Model SubName:</label>
              <input
                type="text"
                value={cab.vehicleModelSubName}
                name="vehicleModelSubName"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>

            <div className="product-rows">
              <label> Transmission Type:</label>
              <input
                type="text"
                value={cab.transmissionType}
                name="transmissionType"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="product-form-field">
            <div className="product-rows">
              <label>Manufacturer : </label>
              <input
                type="text"
                value={cab.manufacturer}
                name="manufacturer"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>

            <div className="product-rows">
              <label> Vehicle Capacity :</label>
              <input
                type="text"
                value={cab.vehicleCapacity}
                name="vehicleCapacity"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="product-form-field">
            <div className="product-rows">
              <label>Vehicle Number :</label>
              <input
                type="text"
                value={cab.vehicleNumber}
                name="vehicleNumber"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>

            <div className="product-rows">
              <label>Comfort Level : </label>
              <input
                type="text"
                value={cab.comfortLevel}
                name="comfortLevel"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="product-form-field">
            <div className="product-rows">
              <label> Fuel Type :</label>
              <select
                value={cab.fueltype}
                name="fueltype"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="Disel">Disel</option>
              </select>
            </div>
            <div className="product-rows">
              <label> KMPL :</label>
              <input
                type="text"
                value={cab.kmpl}
                name="kmpl"
                onChange={(e) => {
                  setcab({ ...cab, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="add-prod-btn">
            <button onClick={handleAddProduct}> Add cab</button>
            <button onClick={resetProduct}> Reset</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCab;
