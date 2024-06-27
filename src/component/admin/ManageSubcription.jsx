import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  GET_ALL_SUBCRIPTION,
  EDIT_SUBCRIPTION,
  DELETE_SUBCRIPTION,
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
const ManageSubcription = () => {


  const columns = [
    {
      name: "Name",
      selector: (row) => row.name || "N/A",
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type || "0",
      sortable: true,
    },
    {
      name: "Credit",
      selector: (row) => row.credit || "0",
      sortable: true,
    },
    {
      name: "Package Validity",
      selector: (row) => row.PackageValidity || "0",
    },
    // {
    //     name: 'Date',
    //     selector: row => getDate(row.create_At),
    //     sortable: true
    // }
    {
      name: "Actions",
      cell: (row) => (
        <div className="manage-pricing-btn">
          <div onClick={() => openModel(row)} className="edit-btn"><FaEdit /></div>
          <div onClick={() => openModel22(row)} className="delete-btn"><MdDelete /></div>
        </div>
      ),
    },
  ];

  const [currentId, setCurrentId] = useState("");

  const [subcriptionData, setSubcriptionData] = useState({
    type: "",
    credit: "",
    PackageValidity: "",
    name: ""
  });

  const [refresh, setRefresh] = useState(true);

  const [isRefresh,setIsRefresh] = useState(false)

  const handleEdit = async () => {
    console.log("Edit row:", subcriptionData, currentId);
    const {name,credit,PackageValidity,type} = subcriptionData
    if (
     !name || !credit || !PackageValidity || !type
    ) {
      toast.error(`Please enter all the fields !`);
    } else {
     

      try {
        setIsRefresh(true)
        const token = localStorage.getItem("Token");
        const response = await axios.patch(
          `${EDIT_SUBCRIPTION}/${currentId}`,
          subcriptionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response", response.data);
        toast.success("Edited successfully!");
        setSubcriptionData({
          type: "",
          credit: "",
          PackageValidity: "",
          name: "",
        });
        setIsOpen(false);
        setIsRefresh(false)
      } catch (error) {
        console.log("error", error);
        toast.error("Error editing Subcription data.");
        // if(error.response){

        // }
      }
    }
  };

  const handleDelete = async () => {
    try {
      setIsRefresh(true)
      const response = await axios.delete(`${DELETE_SUBCRIPTION}/${currentId}`, {
        headers: {
          Authorization: `Bearer `,
        },
      });
      console.log("res", response);
      if (response.status) {
        toast.success("Deleted Successfully!");
        setIsOpen2(false);
        setIsRefresh(false)
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log("hi");
    const getFormData = async () => {
      const token = localStorage.getItem("Token");
      setRefresh(false);
      await axios
        .get(GET_ALL_SUBCRIPTION, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("res",response.data)
          if (response.data) {
            setData(response.data);
            setRefresh(true);
          }
        })
        .catch((error) => {
          console.error(error);
          if(error.response){
            // toast.error(error.response)
            console.log(error.response)
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
      width: "30%",
      zIndex: "9999 !important",
      transform: "translate(-50%, -50%)",
      background:"#ff416b"
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
          background:"#ff416b"
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

    setSubcriptionData({
      type: row.type,
      credit: row.credit,
      PackageValidity: row.PackageValidity,
      name: row.name,
    });
    setCurrentId(row._id);
    // setCurrentId('6666cb18f6a385e4bd87d205')
  };

  return (
    <>
      <div className="Manage-price-container">
        <h1>Subcription Details </h1>
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
        <h1 style={{textAlign:"center"}}>Edit Subcription</h1>
        <section className="add-pricing-sub-container">
          <div className="add-pricing-single-input-container">
          {/* <div className="add-pricing-input-div">
              <input
                placeholder="Name"
                type="texts"
                value={subcriptionData.name}
                name="baseFare"
                onChange={(e) =>
                    setSubcriptionData({
                        ...subcriptionData,
                        [e.target.name]: e.target.value,
                      })
                }
              />
            </div> */}
            {/* <div className="add-pricing-input-div">
              <select
                value={subcriptionData.type}
                name="type"
                onChange={(e) =>
                  setSubcriptionData({
                    ...subcriptionData,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value={"rider"}>Rider</option>
                <option value={"driver"}>Driver</option>
              
              </select>
            </div> */}
         
           
            {/* <div className="add-pricing-input-div">
              <input
                placeholder="Credit"
                type="number"
                value={subcriptionData.credit}
                name="credit"
                onChange={(e) =>
                    setSubcriptionData({
                        ...subcriptionData,
                        [e.target.name]: e.target.value,
                      })
                }
              />
            </div> */}

            <div className="add-pricing-single-input-div">
                <label style={{padding:"1%"}}>Package Validity :</label>
              <input
                placeholder="Package Validity"
                type="number"
                value={subcriptionData.PackageValidity}
                name="PackageValidity"
                onChange={(e) =>
                    setSubcriptionData({
                        ...subcriptionData,
                        [e.target.name]: e.target.value,
                      })
                }
              />
            </div>
            
            
          
          </div>
    
          <div className="btns">
            <div className="model-submit-btn">
              <button onClick={() => handleEdit()}>Submit</button>
            </div>
            <div className="model-cancel-btn">
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
        <h1 style={{ textAlign: "center" }}>Do you want to Delete ?</h1>
        <section className="">
          <div className="delete-btns">
            <div className="yes-btn">
              <button onClick={() => handleDelete()}>Yes</button>
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

export default ManageSubcription;
