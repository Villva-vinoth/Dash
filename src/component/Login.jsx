import React, { useState } from 'react'
import * as Components from '../Components';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { REGISTER, LOGIN } from './services/ApiService'
import { useAuth } from './Routers/AuthContext';
const Login = () => {

    const { setIsAuthenticate,setRoleType } = useAuth();

    const [signIn, toggle] = React.useState(true);
    const [LoginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [RegisterData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: ""
    })


    const nav = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        if (LoginData.email == '' || LoginData.password == '') {
            console.log("empty")
            toast.error(`please enter all the Fields !`)
        }
        else {
            console.log('value', LoginData)
            console.log('login', LOGIN)
            // setIsAuthenticate(true)
            await axios.post(LOGIN, LoginData).then((res) => {

                if (res.data) {
                    console.log(res.data)
                    localStorage.setItem('Position',res.data.admin.position)
                    localStorage.setItem('Id', res.data.admin._id)
                    localStorage.setItem('Token', res.data.token)
                    setIsAuthenticate(true)
                    toast.success('Login Successfull !')
                    setTimeout(() => {
                        nav('/admin')
                    }, 2000)
                }
            }).catch((error) => {
                console.log(error)
                // if(error.message)
                toast.error(`${error.message}`)
            })

            handleClear()

        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if (RegisterData.email == " " || RegisterData.password == " " || RegisterData.phone == " " || RegisterData.name == "" || RegisterData.confirmPassword == "") {
            toast.error(`please enter all the fields !`)
        }
        else if (RegisterData.password == RegisterData.confirmPassword) {
            toast.warn(`password and Confirm Password must be same !`)
        }
        else {
            console.log('value', RegisterData)
            // const Register = await axios.post()
            toast.success('Registered Successfully !')
        }

    }
    const handleClear = () => {
        console.log('clear Data')
        setRegisterData({
            name: "",
            email: "",
            password: "",
            phone: "",
            confirmPassword: ""
        })
        setLoginData({
            email: "",
            password: "",
        })
    }
    return (
        <div className='login-container'>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input type='text' placeholder='Name' name="name" value={RegisterData.name} onChange={(e) => setRegisterData({ ...RegisterData, [e.target.name]: e.target.value })} />
                        <Components.Input type='email' placeholder='Email' name='email' value={RegisterData.email} onChange={(e) => setRegisterData({ ...RegisterData, [e.target.name]: e.target.value })} />
                        <Components.Input type='text' placeholder='Phone' name='phone' value={RegisterData.phone} onChange={(e) => setRegisterData({ ...RegisterData, [e.target.name]: e.target.value })} />
                        <Components.Input type='password' placeholder='Password' name='password' value={RegisterData.password} onChange={(e) => setRegisterData({ ...RegisterData, [e.target.name]: e.target.value })} />
                        <Components.Input type='password' placeholder='Confirm Password' name='confirmPassword' value={RegisterData.confirmPassword} onChange={(e) => setRegisterData({ ...RegisterData, [e.target.name]: e.target.value })} />

                        <Components.Button onClick={(e) => handleRegister(e)}>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input type='email' placeholder='Email' name='email' value={LoginData.email} onChange={(e) => setLoginData({ ...LoginData, [e.target.name]: e.target.value })} />
                        <Components.Input type='password' placeholder='Password' name='password' value={LoginData.password} onChange={(e) => setLoginData({ ...LoginData, [e.target.name]: e.target.value })} />
                        {/* <Components.Anchor href='#'>Forgot your password?</Components.Anchor> */}
                        <Components.Button onClick={(e) => { handleLogin(e) }}>Sigin In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>

                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => { toggle(true); handleClear() }}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Admin!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => { toggle(false); handleClear() }}>
                                Sigin Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Container>
            <ToastContainer />

        </div>
    )
}

export default Login