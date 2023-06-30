import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"

const Header = () => {
	const { setUserData, userData } = useContext(UserContext)
	useEffect(() => {
		fetch("http://localhost:5000/users/profile", {
			credentials: "include",
		})
		.then(response => {
			response.json().then((data, err) => {
				setUserData(data);
				console.log(data);
				console.log({userData});
			})
		})
	}, [])

	const logout = () => {
		fetch("http://localhost:5000/users/logout", {
			method: "POST",
			credentials: "include"
		})
		setUserData(null)
	}

	const username = userData?.data?.username
	return (
		<header className="flex px-5 lg:px-20 bg-white justify-between py-4 h-[65px] items-center w-full sticky top-0">
			<Link to="/" className="text-3xl font-bold text-black cursor-pointer hover:text-emerald-400 transition delay-200">MyBlog.</Link>
			<nav className="flex items-center justify-between text-gray-800 text-sm space-x-4">
			{ username && (
				<>
					<Link to="/create" className="cursor-pointer hover:text-emerald-400 transition delay-200">Create</Link>
					<p onClick={logout} className="cursor-pointer hover:text-emerald-400 transition delay-200">Logout</p>
				</>
				)}
			{!username && (
				<>
					<Link to="/register" className="cursor-pointer hover:text-emerald-400 transition delay-200">Register</Link>
					<Link to="/login" className="cursor-pointer hover:text-emerald-400 transition delay-200">Login</Link>
				</>
				)}
			</nav>
		</header>
	)
}

export default Header