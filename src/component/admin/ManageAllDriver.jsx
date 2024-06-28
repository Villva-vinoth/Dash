import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  GET_ALL_PRICING,
  EDIT_PRICING,
  DELETE_PRICING,
  GET_ALL_DRIVERS,
} from "../services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./css/ManagePricing.css";
import Modal from "react-modal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Lottie from "lottie-react";
import lottieData from "../Asset/carLoader.json";
const ManageAllDriver = () => {
  const getDate = (date) => {
    const utcTimeDate = new Date(date);
    const istTime = utcTimeDate.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    return istTime;
  };

  const columns = [
    {
      name: "FullName",
      selector: (row) =>
        row.driverFirstName + " " + row.driverLastName || "N/A",
      sortable: true,
    },
    {
      name: "Driver Id",
      selector: (row) => row.driverId || "0",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.driverEmailId || "N/A",
      sortable: true,
    },

    {
      name: "Phone",
      cell: (row) => (
        <div className="manage-driver-phone">
          <div className="">{row.driverPhonePrimary}</div>
          <div className="">{row.driverPhoneSecondary}</div>
        </div>
      ),
    },
    {
      name: "Duty",
      selector: (row) => row.driverDutyType || "0",
    },
    {
      name: "Vehicle",
      selector: (row) => row.driverVehicleType || "0",
    },

    {
      name: "Vehicle Number",
      selector: (row) => row.driverVehicleNumber || "0",
    },
    {
      name: "Work Status",
      selector: (row) => row.driverWorkStatus || "0",
    },

    {
      name: "Actions",
      cell: (row) => (
        <div onClick={() => openModel(row)} className="edit-btn center-cell"><FaEdit size={20}/></div>
      ),
    },
  ];

  const [currentId, setCurrentId] = useState("");

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

  const [refresh, setRefresh] = useState(true);

  const [isRefresh, setIsRefresh] = useState(false);

  //   const handleEdit = async () => {
  //     console.log("Edit row:", pricingData, currentId);

  //     if (
  //       pricingData.vehicleType == "" ||
  //       pricingData.baseFare == "" ||
  //       pricingData.perKmFare == "" ||
  //       pricingData.minimumFare == "" ||
  //       pricingData.city == "" ||
  //       pricingData.timeFare == "" ||
  //       pricingData.waitingFare == "" ||
  //       pricingData.peakFare.from == "" ||
  //       pricingData.peakFare.to == ""
  //     ) {
  //       toast.error(`Please enter all the fields !`);
  //     } else {
  //       pricingData.peakFare.from = convertToISO(pricingData.peakFare.from);
  //       pricingData.peakFare.to = convertToISO(pricingData.peakFare.to);
  //       pricingData.peakFare.percent = "5";
  //       console.log(pricingData);

  //       try {
  //         setIsRefresh(true)
  //         const token = localStorage.getItem("Token");
  //         // console.log('URL',`${EDIT_PRICING}/${currentId}`)
  //         const response = await axios.patch(
  //           `${EDIT_PRICING}/${currentId}`,
  //           pricingData,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         console.log("response", response.data);
  //         toast.success("Edited successfully!");
  //         setPricingData({
  //           vehicleType: "",
  //           baseFare: "",
  //           perKmFare: "",
  //           minimumFare: "",
  //           city: "",
  //           timeFare: "",
  //           waitingFare: "",
  //           peakFare: {
  //             from: "",
  //             to: "",
  //           },
  //         });
  //         setIsOpen(false);
  //         setIsRefresh(false)
  //       } catch (error) {
  //         console.log("error", error);
  //         toast.error("Error editing pricing data.");
  //       }
  //     }
  //   };

  //   const handleDelete = async () => {
  //     try {
  //       setIsRefresh(true)
  //       const response = await axios.delete(`${DELETE_PRICING}/${currentId}`, {
  //         headers: {
  //           Authorization: `Bearer `,
  //         },
  //       });
  //       console.log("res", response);
  //       if (response.status) {
  //         toast.success("Deleted Successfully!");
  //         setIsOpen2(false);
  //         setIsRefresh(false)
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  const convertToISO = (dateString) => {
    const date = new Date(dateString);
    return date.getTime().toString();
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const getFormData = async () => {
      const token = localStorage.getItem("Token");
      setRefresh(false);
      await axios
        .get(GET_ALL_DRIVERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("res", response);
          if (response.data.data) {
            setData(response.data.data.drivers);
            setRefresh(true);
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            console.log(error.response);
          }
        });
    };
    getFormData();
  }, [isRefresh]);

  const customStyle = {
    headCells: {
      className: "datatable-header",
      style: {
        fontSize: "16px",
        fontWeight: "600",
        zIndex: "-11 !important",
        color: "blue",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      // marginTop:'20%',
      width: "90%",
      zIndex: "9999 !important",
      transform: "translate(-50%, -50%)",
      background: "#ff416b",
    },
  };

  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      // marginTop:'20%',
      width: "30%",
      zIndex: "9999 !important",
      transform: "translate(-50%, -50%)",
      background: "#ff416b",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModel22 = (row) => {
    setIsOpen2(true);
    setCurrentId(row._id);
    console.log(row);
  };

  const closeModel22 = () => {
    setIsOpen2(false);
  };

  const openModel = (row) => {
    setIsOpen(true);
    console.log(row);
    const formatDate = (date) => {
      const d = new Date(date);
      console.log("sata", d, date);
      const year = d.getFullYear();
      const month = `0${d.getMonth() + 1}`.slice(-2);
      const day = `0${d.getDate()}`.slice(-2);
      const hours = `0${d.getHours()}`.slice(-2);
      const minutes = `0${d.getMinutes()}`.slice(-2);
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setPricingData({
      vehicleType: row.vehicleType,
      baseFare: row.baseFare,
      perKmFare: row.perKmFare,
      minimumFare: row.minimumFare,
      city: row.city,
      timeFare: row.timeFare,
      waitingFare: row.waitingFare,
      peakFare: {
        from: formatDate(row.peakFare.from),
        to: formatDate(row.peakFare.to),
      },
    });
    setCurrentId(row._id);
    // setCurrentId('6666cb18f6a385e4bd87d205')
  };

  return (
    <>
      <div className="Manage-price-container">
        <h1>Driver Details</h1>
        <div className="search-options">
              <input placeholder="phone"/>
              <input placeholder="Name"/>
              <input placeholder="Vehicle Number"/>
              <input placeholder="Driver id"/>
              <input type="number" placeholder="limit"/>
              <input type="number" placeholder="page"/>
              <button>Search</button>
            </div>
        {refresh == true ? (
          <div>
          
            {modalIsOpen == false ? (
              <div className="data-table-container">
                <DataTable
                  customStyles={customStyle}
                  columns={columns}
                  data={data}
                  fixedHeader
                  pagination
                  highlightOnHover
                ></DataTable>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="manage-price-lottie">
            <Lottie animationData={lottieData} />
          </div>
        )}
        <ToastContainer />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1>Edit Pricing</h1>
        <section className="add-pricing-sub-container">
          <div className="add-pricing-inputs-container">
            <div className="add-pricing-input-div">
              <select
                value={pricingData.vehicleType}
                name="vehicleType"
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                {/* <option value={''}>select Vehicle Type</option> */}
                <option value={"BIKE"}>Bike</option>
                <option value={"EV_BIKE"}>Electronic Bike</option>
                <option value={"AUTO"}>Auto</option>
                <option value={"EV_AUTO"}>Electronic Auto</option>
                <option value={"CAR"}>Car</option>
                <option value={"EV_CAR"}>Electronic Car</option>
              </select>
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Base Fare"
                type="number"
                value={pricingData.baseFare}
                name="baseFare"
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="add-pricing-input-div">
              <select
                value={pricingData.city}
                name="city"
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                {/* <option value={''}>select city</option> */}
                <option value={"madurai"}>MADURAI</option>
                <option value={"coimbatore"}>COIMBATORE</option>
              </select>
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Minimum Fare"
                type="number"
                value={pricingData.minimumFare}
                name="minimumFare"
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Per Km Fare"
                type="number"
                value={pricingData.perKmFare}
                name="perKmFare"
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Time Fare"
                type="number"
                value={pricingData.timeFare}
                name="timeFare"
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="add-pricing-input-div">
              <input
                placeholder="Waiting Fare"
                type="number"
                value={pricingData.waitingFare}
                name="waitingFare"
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    [e.target.name]: e.target.value,
                  })
                }
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
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      peakFare: {
                        ...pricingData.peakFare,
                        from: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="add-pricing-input-div">
                <input
                  type="datetime-local"
                  value={pricingData.peakFare.to}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      peakFare: { ...pricingData.peakFare, to: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="btns">
            <div className="submit-btn">
              {/* <button onClick={() => handleEdit()}>Submit</button> */}
            </div>
            <div className="submit-btn">
              <button onClick={() => closeModal()}>cancel</button>
            </div>
          </div>
        </section>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModel22}
        style={customStyles2}
        contentLabel="Example Modal"
      >
        <h1 style={{ textAlign: "center" }}>Do you want to Delete Pricing ?</h1>
        <section className="">
          <div className="delete-btns">
            <div className="yes-btn">
              {/* <button onClick={() => handleDelete()}>Yes</button> */}
            </div>
            <div className="no-btn">
              <button onClick={() => closeModel22()}>No</button>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default ManageAllDriver;
