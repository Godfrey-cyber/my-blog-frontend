import React, { useState } from 'react'
import { Link } from "react-router-dom"

const Register = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	//register user
	const register = async(event) => {
		event.preventDefault()
		const res = await fetch("http://localhost:5000/users/register", {
			method: "POST",
			body: JSON.stringify({ username, password, email }),
			headers: { "Content-Type": "application/json" }
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
				<form action="" onSubmit={register} className="flex flex-col my-8 lg:w-[500px] min-h-fit space-y-4 rounded-md h- bg-white items-center mx-auto p-4">
					<h4 className="text-gray-600 font-bold items-center my-4">Create an account</h4>
					<input type="username" value={username} onChange={event => setUsername(event.target.value)} id="username" placeholder="Enter your username" className="mx-auto outline-none border-2 border-gray-300 w-[400px] bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700" />
					<input type="password" value={password} onChange={event => setPassword(event.target.value)} id="password" placeholder="Enter your password" className="mx-auto outline-none border-2 border-gray-300 w-[400px] bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700" />
					<input type="email" value={email} onChange={event => setEmail(event.target.value)} id="email" placeholder="Enter your email" className="mx-auto outline-none border-2 border-gray-300 w-[400px] bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700" />
					<button type="submit" className="w-[400px] bg-green-400 rounded-md px-4 py-3 outline-none text-sm text-white hover:text-green-700 transition delay-200 hover:bg-gray-300 font-bold">Register</button>
					<div className="flex space-x-4 text-sm font-light text-gray-700">
						<p className="">Already have an account? <Link to="/login" className="text-sm font-normal cursor-pointer text-green-400">Login</Link></p>
					</div>
				</form>
			{/*// </div>*/}
		</section>
	)
}

export default Register