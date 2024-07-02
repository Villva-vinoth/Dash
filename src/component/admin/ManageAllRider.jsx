import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  GET_ALL_RIDERS,
} from "../services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./css/ManageDrivers.css";  
import Modal from "react-modal";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdGridView } from "react-icons/md";
import Lottie from "lottie-react";
import lottieData from "../Asset/carLoader.json";
const ManageAllRider = () => {
  const getDate = (date) => {
    const utcTimeDate = new Date(date);
    const istTime = utcTimeDate.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    return istTime;
  };

  const columns = [
    {
      name: "Name",
      selector: (row) =>
        row.riderName || "N/A",
      sortable: true,
    },
    {
      name: "Rider Id",
      selector: (row) => row.riderID || "0",
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.riderPhoneNumber || "N/A",

    },
    {
      name: "Profile status",
      selector: (row) => row.riderProfileStatus || "0",
    },
    {
      name: "Current Status",
      selector: (row) => row.currentStatus || "0",
    },
    {
      name: "Last Updated",
      selector: (row) => row.updatedAt.toString().split('T') || "0",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div onClick={() => openModel(row)} className="edit-btn center-cell">
          <MdGridView size={20} />
        </div>
      ),
    },
  ];

  const [currentId, setCurrentId] = useState("");

  const [searchData, setSearchData] = useState({
    phoneNumber: "",
    name: "",
    vehicleNumber: "",
    driverId: "",
    limit: 10,
    page: 1,
  });

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
  //       toast.error(Please enter all the fields !);
  //     } else {
  //       pricingData.peakFare.from = convertToISO(pricingData.peakFare.from);
  //       pricingData.peakFare.to = convertToISO(pricingData.peakFare.to);
  //       pricingData.peakFare.percent = "5";
  //       console.log(pricingData);

  //       try {
  //         setIsRefresh(true)
  //         const token = localStorage.getItem("Token");
  //         // console.log('URL',${EDIT_PRICING}/${currentId})
  //         const response = await axios.patch(
  //           ${EDIT_PRICING}/${currentId},
  //           pricingData,
  //           {
  //             headers: {
  //               Authorization: Bearer ${token},
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
  //       const response = await axios.delete(${DELETE_PRICING}/${currentId}, {
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
        .get(`${GET_ALL_RIDERS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("res", response);
          if (response.data.data) {
            setData(response.data.data.riderList);
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

  const handleSearch = () => {
    console.log("--->", searchData);
    setIsRefresh(!isRefresh)
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (searchData.limit <= 0) {
      setSearchData({ ...searchData, [e.target.name]: 1 });
    }
    if (searchData.page <= 0) {
      setSearchData({ ...searchData, [e.target.name]: 1 });
    } else {
      setSearchData({ ...searchData, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="Manage-price-container">
        <h1>Rider Details</h1>
        {/* <div className="search-options">
          <input
            placeholder="Phone Number"
            onChange={(e) => handleChange(e)}
            value={searchData.phoneNumber}
            name="phoneNumber"
          />
          <input
            placeholder="Name"
            onChange={(e) => handleChange(e)}
            value={searchData.name}
            name="name"

          />
          <input
            placeholder="Vehicle Number"
            onChange={(e) => handleChange(e)}
            value={searchData.vehicleNumber}
            name="vehicleNumber"
          />
          <input
            placeholder="Driver id"
            onChange={(e) => handleChange(e)}
            value={searchData.driverId}
            name="driverId"
          />
          <input
            type="number"
            placeholder="limit"
            onChange={(e) => handleChange(e)}
            value={searchData.limit}
            name="limit"
          />
          <input
            type="number"
            placeholder="page"
            onChange={(e) => handleChange(e)}
            value={searchData.page}
            name="page"
          />
          <button onClick={() => handleSearch()} className="btn-search"><FaSearch />Search</button>
        </div> */}
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

export default ManageAllRider;