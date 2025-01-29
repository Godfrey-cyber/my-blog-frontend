import React, { useState, useContext } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, loginFailure, loginSuccess, loginStart, registerStart } from "../Redux/Slices/userSlice.js"
import { client } from "../assets/utilities.js"
import axios from "axios"
// import 

const Login = () => {
	// const [password, setPassword] = useState('')
	const [formData, setFormData] = useState({ email: "", password: "" })
	const [redirect, setRedirect] = useState(false)

	const navigate = useNavigate()
	// login
	const { email, password } = formData
    const onChange = (event) => {
		const { name, value } = event.target;
        setFormData({...formData, [name]: value })
    }
    const dispatch = useDispatch()
	const login = async (event) => {
		event.preventDefault()
		if (!email || !password) {
			alert("All required fields must be filled.");
			// toast.warn("All required fields must be filled.")
	        return;
		}
		dispatch(loginStart())
		try {
			const res = await client.post("/users/login", formData)
			if (res.status === 200) {
	    		dispatch(loginSuccess(res.data.user))
	    		navigate("/")
	    		console.log(res.data.user);
	    		// toast.success("Successfully Logged in🥇");
	    	}
		} catch (error) {
			dispatch(loginFailure(error?.response?.data?.msg || "Registration Failed"))
			setFormData((prevData) => ({
                ...prevData,
                password: ""
            }));
		}
	}
	return ( // min-h-[calc(100vh - 60px)]
		<section className="grid grid-cols-12 h-screen overflow-y-hidden w-full bg-white">
			<div className="col-span-12 lg:col-span-8 hidden lg:flex flex-col items-center justify-center space-y-4 bg-green-500 ">
				<p className="text-white text-5xl font-bold">Techcranch</p>
				<div className="flex flex-col space-y-2">
					<p className="text-white text-3xl font-bold">Welcome to TechCranch</p>
					<p className="text-white text-lg font-semibold border-b-4 border-green-600">Create an account to unlock these benefits</p>
				</div>
				<div className="flex flex-col space-y-1 pl-5">
					<p className="text-white text-lg">1. Comment on articles an express yourself</p>
					<p className="text-white text-lg">2. Manage your newsletters</p>
					<p className="text-white text-lg">3. Access privacy setting</p>
					<p className="text-white text-lg">4. Browse without the distruction of the pop-up adds</p>
				</div>
			</div>
			<form onSubmit={login} className="col-span-12 lg:col-span-4 flex flex-col justify-center items-center space-y-4 px-5">
				<img className="h-8 w-auto" src="https://s.yimg.com/wm/assets/images/ns/techcrunch-logov0.0.2.png" alt="" />
				<h4 className="text-gray-700 text-2xl font-bold items-center my-4">Login</h4>
				<input type="email" value={email} onChange={onChange} name="email" placeholder="Email" className="login_input" />
				<input type="password" value={password} onChange={onChange} name="password" placeholder="Password" className="login_input" />
				<button type="submit" className="login_button">Login</button>
				<div className="flex space-x-4 text-sm font-light text-gray-700">
					<p className="">Don't have an account? <Link to="/register" className="text-sm font-normal cursor-pointer text-green-400">Register</Link></p>
				</div>
			</form>
		</section>
	)
}

export default Login