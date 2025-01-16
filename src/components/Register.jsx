import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom"

const Register = () => {
	const [formData, setFormData] = useState({ email: "", password: "", username: "" })
	const [email, setEmail] = useState('')
	const [redirect, setRedirect] = useState(false)
	
	const { username, password, email } = formData
	const onChange = (event) => {
		const { name, value } = event.target;
        setFormData({...formData, [name]: value })
    }
    //register user
	const register = async (event) => {
		event.preventDefault()
		if (!email || !password || !username) {
			alert("All required fields must be filled.");
			// toast.success("Successfully Logged in🥇")
	        return;
		}
		try {
		const res = await axios.post("https://my-blog-backend-t19h.onrender.com/users/register", formData, { withCredentials: true })
			if (res.status === 200 || res.status === 201) {
				setFormData({ email: "", password: "", username: "" });
				// navigate("/")
				console.log(res.data)
	   			// toast.success("Successfully Logged in🥇")
			}
		} catch (error) {
			console.log(error)
			setFormData((prevData) => ({
                ...prevData,
                password: ""
            }));
		}
	}

	if (redirect) {
		return <Navigate to={'/'} />
	}
	return (
		<section className="min-h-[calc(100vh - 60px)] w-full px-5 md:px-10 lg:px-20">
			{/*<div className="flex flex-col  rounded-md bg-white shadow-sm p-4 mx-auto h-full my-12 h-fit">*/}
				<form action="" onSubmit={register} className="register">
					<h4 className="text-gray-600 font-bold items-center my-4">Create an account</h4>
					<input type="username" value={username} onChange={event => setUsername(event.target.value)} id="username" placeholder="Enter your username" className="register_input" />
					<input type="password" value={password} onChange={event => setPassword(event.target.value)} id="password" placeholder="Enter your password" className="register_input" />
					<input type="email" value={email} onChange={event => setEmail(event.target.value)} id="email" placeholder="Enter your email" className="register_input" />
					<button type="submit" className="register_button">Register</button>
					<div className="flex space-x-4 text-sm font-light text-gray-700">
						<p className="">Already have an account? <Link to="/login" className="register_p">Login</Link></p>
					</div>
				</form>
			{/*// </div>*/}
		</section>
	)
}

export default Register