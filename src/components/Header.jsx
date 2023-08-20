import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"
import { client } from "../assets/utilities.js"

const Header = () => {
	const { setUserData, userData } = useContext(UserContext)
	const [name, setName] = useState("")

	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const response = await client.get("/users/profile", {
					withCredentials: true
				})
				setUserData(response?.data);
			} catch (error) {
				console.error(error?.stack);
			}
		}
		getUserProfile()
	}, [])

	const logout = () => {
		client.post("/users/logout", {
			withCredentials: true
		})
		setUserData(null)
	}

	const username = userData?.data?.username
	return (
		<header className="header">
			<Link to="/" className="header_logo">MyBlog.</Link>
			<nav className="header_username">
			{ username && (
				<>
					<Link to="/create" className="header_links">Create</Link>
					<p onClick={logout} className="header_links">Logout</p>
				</>
				)}
			{!username && (
				<>
					<Link to="/register" className="header_links">Register</Link>
					<Link to="/login" className="header_links">Login</Link>
				</>
				)}
			</nav>
		</header>
	)
}

export default Header