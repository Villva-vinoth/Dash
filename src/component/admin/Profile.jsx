import React, { useEffect, useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './css/profile.css'
import Modal from 'react-modal';
import { CHANGE_PASSWORD } from '../services/ApiService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {GET_ADMIN} from '../services/ApiService'
const Profile = () => {

    const [modelOpen, setModelOpen] = useState(false);

    const [passwordData, setpasswordData] = useState({
        userId: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            // marginTop:'20%',
            width: '40%',
            zIndex: '9999 !important',
            transform: 'translate(-50%, -50%)',
            background:"#403c8f",
            borderRadius:"20px"
        },
    };

    const openModel = () => {
        setModelOpen(true)
    }

    const closeModal = () => {
        setModelOpen(false)
    }

    const [user,setUser]= useState("")

    useEffect(()=>{
        const getUser = async () =>{
            const token = localStorage.getItem('Token')
            await axios.get(GET_ADMIN,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res)
                if(res.status){
                    setUser(res.data.data.name)
                }
            }).catch((error)=>{
                console.log(error)
                if(error.response){
                    console.log(error.response.data.err)
                }
            })
        }
        getUser()
    },[])


    const oldPasswordRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmpasswordRef = useRef(null)
    const [oldpasswordIcon, setOldPasswordIcon] = useState(<FaEyeSlash></FaEyeSlash>)
    const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash></FaEyeSlash>)
    const [confirmpasswordIcon, setConfirmPasswordIcon] = useState(<FaEyeSlash></FaEyeSlash>)

    let renderIcon = ""

    const oldPassword = () => {

        if (oldPasswordRef.current.type == "password") {
            renderIcon = <FaEye></FaEye>
            oldPasswordRef.current.type = "text"
            setOldPasswordIcon(renderIcon)

        }
        else {
            oldPasswordRef.current.type = "password";
            renderIcon = <FaEyeSlash></FaEyeSlash>
            setOldPasswordIcon(renderIcon)
            console.log(renderIcon)
        }
    }
    const showPassword = () => {

        if (passwordRef.current.type == "password") {
            renderIcon = <FaEye></FaEye>
            passwordRef.current.type = "text"
            setPasswordIcon(renderIcon)

        }
        else {
            passwordRef.current.type = "password";
            renderIcon = <FaEyeSlash></FaEyeSlash>
            setPasswordIcon(renderIcon)
            console.log(renderIcon)
        }
    }

    const showConfirmPassword = () => {

        if (confirmpasswordRef.current.type == "password") {
            renderIcon = <FaEye />
            confirmpasswordRef.current.type = "text"
            setConfirmPasswordIcon(renderIcon)

        }
        else {
            confirmpasswordRef.current.type = "password";
            renderIcon = <FaEyeSlash></FaEyeSlash>
            setConfirmPasswordIcon(renderIcon)
            console.log(renderIcon)
        }
    }

    const handleSubmit = async () => {
        console.log(passwordData)
        passwordData.userId = localStorage.getItem('Id')
        if (passwordData.oldPassword == "" || passwordData.newPassword == "" || passwordData.confirmPassword == "") {
            toast.error(`please enter all the fields !`)
        }
        else if (passwordData.newPassword != passwordData.confirmPassword) {
            toast.warn(` New password and confirm password Fields must be same !`)
        }
        else {
            const token = localStorage.getItem('Token')
            try {
                const response = await axios.post(CHANGE_PASSWORD, passwordData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status) {
                    setpasswordData({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    })
                    toast.success('Password Changed successfully!')
                }

            } catch (error) {
                if (error.response.data) {
                    toast.error(`${error.response.data.message}`)
                }
                else {
                    toast.error(`${error.message}`)
                }
            }
        }
    }

    return (
        <div className='profile-display'>
            <h1 className='user-profile'>Hi {user} !</h1>
            <div className='profile-cont'>
                <h1>Personal Details</h1>
                <div></div>
            </div>
            <div className='profile-cont2' onClick={() => openModel()}>
                <h4>Change password</h4>
            </div>

            <Modal
                isOpen={modelOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <section className='modal-container'>
                    <h1>Change Password </h1>
                    <div className='input-cont-logo'>
                        <input type="password"
                            placeholder='Old password'
                            name='oldPassword'
                            onChange={(e) => setpasswordData({ ...passwordData, [e.target.name]: e.target.value })}
                            ref={oldPasswordRef}
                        />
                        <span className='user-logo' onClick={oldPassword}>{oldpasswordIcon}</span>
                    </div>

                    <div className='input-cont-logo'>
                        <input type="password"
                            placeholder='New password'
                            name='newPassword'
                            onChange={(e) => setpasswordData({ ...passwordData, [e.target.name]: e.target.value })}
                            ref={passwordRef}
                        />
                        <span className='user-logo' onClick={showPassword}>{passwordIcon}</span>
                    </div>

                    <div className='input-cont-logo'>
                        <input type="password"
                            placeholder='Confirm password'
                            name='confirmPassword'
                            onChange={(e) => setpasswordData({ ...passwordData, [e.target.name]: e.target.value })}
                            ref={confirmpasswordRef}
                        />
                        <span className='user-logo' onClick={showConfirmPassword}>{confirmpasswordIcon}</span>

                    </div>
                    <div className='modal-change-btn'>
                        <button className='modal-submit' onClick={() => handleSubmit()}>
                            submit
                        </button>
                        <button className='modal-cancel' onClick={() => closeModal()}>
                            cancel
                        </button>
                    </div>
                </section>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default Profile