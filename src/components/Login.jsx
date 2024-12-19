import React, { useState, useContext } from 'react'
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import { client } from "../assets/utilities"

const Login = () => {
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [redirect, setRedirect] = useState(false)
	const { setUserData } = useContext(UserContext)
	// login
	const login = async (event) => {
		event.preventDefault()
		if (!email || !password) {
			alert("All required fields must be filled.");
	        return;
		}

		try {
		const res = await axios.post("https://my-blog-backend-t19h.onrender.com/users/login", formData, { withCredentials: true })
			if (res.status === 200 || res.status === 201) {
				setFormData({ email: "", password: "" });
				navigate("/")
	   			// toast.success("Successfully Logged in🥇")
			}
		} catch (error) {
			console.log(err)
			setPassword("")
		}
	}
	return (
		<section className="min-h-[calc(100vh - 60px)] w-full px-5 md:px-10 lg:px-20">
			{/*<div className="flex flex-col  rounded-md bg-white shadow-sm p-4 mx-auto h-full my-12 h-fit">*/}
				<form action="" onSubmit={login} className="login_form">
					<h4 className="text-gray-600 font-bold items-center my-4">Login</h4>
					<input type="email" value={email} onChange={event => setEmail(event.target.value)} id="email" placeholder="Enter your email" className="login_input" />
					<input type="password" value={password} onChange={event => setPassword(event.target.value)} id="password" placeholder="Enter your email" className="login_input" />
					<button type="submit" className="login_button">Login</button>
					<div className="flex space-x-4 text-sm font-light text-gray-700">
						<p className="">Don't have an account? <Link to="/register" className="text-sm font-normal cursor-pointer text-green-400">Register</Link></p>
					</div>
				</form>
			{/*// </div>*/}
		</section>
	)
}

export default Login