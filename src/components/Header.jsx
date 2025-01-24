import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"
import { client } from "../assets/utilities.js"
import Sidebar from "./SideBar.jsx"
import axios from 'axios'

const Header = () => {
	const { setUserData, userData } = useContext(UserContext)
	const [name, setName] = useState("")

	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
	    setIsOpen(!isOpen);
	};

	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const response = await client.get("/users/profile", {
					withCredentials: true
				})
				if (response && response?.status === 200 || response.statusText === "OK") {
					setUserData(response?.data);
				}
			} catch (error) {
				if (error || !response?.status === 200 || !response?.statusText === 'OK') {
					console.error(error?.stack);
					console.error('❗Error fetching data❌:', error.message);
				}
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
		<span className="flex items-center space-x-1">
			{/*<Link to="/" className="header_logo">MyBlog.</Link>*/}
			<Link to="/">
				<img className="h-8 w-auto" src="https://s.yimg.com/wm/assets/images/ns/techcrunch-logov0.0.2.png" alt="" />
			</Link>
			<Sidebar />
		</span>
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
					<Link to="/login_user" className="header_links">Login</Link>
				</>
				)}
			</nav>
		</header>
	)
}

export default Header
