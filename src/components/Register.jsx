import React, { useState } from 'react'
import { Link } from "react-router-dom"

const Register = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	//register user
	const register = async(event) => {
		event.preventDefault()
		const res = await fetch("https://my-blog-backend-t19h.onrender.com/users/register", {
			method: "POST",
			body: JSON.stringify({ username, password, email }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})
		if (res.status === 200) {
			console.log("Registration successful")
		} else {
			console.log("Sorry something went wrong! Try again later please...")
		}
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