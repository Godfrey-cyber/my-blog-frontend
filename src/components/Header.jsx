import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../UserContext"
import { Link, useNavigate } from "react-router-dom"
import { client } from "../assets/utilities.js"
import Sidebar from "./SideBar.jsx"
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../Redux/Slices/userSlice.js"
import { selectPost } from "../Redux/Slices/postSlice.js"
import { MdOutlineViewHeadline, MdOutlineSearch } from "react-icons/md";
import axios from 'axios'

const Header = () => {
	const { setUserData, userData } = useContext(UserContext)
	const [name, setName] = useState("")

	const [isOpen, setIsOpen] = useState(false);
	const user = useSelector(selectUser).user
	const posts = useSelector(selectPost)
	const navigate = useNavigate()
	console.log(user)
	const toggleSidebar = () => {
	    setIsOpen(!isOpen);
	};
	return (
		<header className="flex px-5 lg:px-20 bg-black justify-between py-4 h-[65px] items-center w-full sticky top-0 border border-gray-200">
			<span className="flex items-center space-x-1">
				{/*<Link to="/" className="header_logo">MyBlog.</Link>*/}
				<Link to="/">
					<img className="h-8 w-auto" src="https://s.yimg.com/wm/assets/images/ns/techcrunch-logov0.0.2.png" alt="" />
				</Link>
			</span>
			<nav className="lg:flex items-center space-x-3 hidden ">
				<Link to="/latest" className="header_links">Latest</Link>
				<Link to="/register" className="header_links">Startups</Link>
				<Link to="/login_user" className="header_links">Venture</Link>
				<Link to="#" className="header_links">Apple</Link>
				<Link to="/register" className="header_links">Security</Link>
				<Link to="/login_user" className="header_links">AI</Link>
				<Link to="#" className="header_links">Apps</Link>
				<Link to="/register" className="header_links">Events</Link>
				<Link to="/login_user" className="header_links">Podcasts</Link>
				<Link to="/login_user" className="header_links">Newsletters</Link>
			</nav>
			<div className="flex items-center space-x-5">
				{user && <span onClick={() => navigate("/login_user")} className="flex items-center space-x-1 group cursor-pointer p-1 hover:border border-gray-100 rounded-2xl">
					<FaRegCircleUser className="text-sm h-6 w-6 text-white transition delay-200 group-hover:text-emerald-400" />
					<p className="md:flex hidden text-sm text-white font-normal group-hover:text-emerald-400">Sign In</p>
				</span>}
				<span className="rounded p-1 hover:border border-gray-100 rounded-full transition-all delay-200">
					<MdOutlineSearch className="text-sm h-6 w-6 cursor-pointer text-white hover:text-emerald-400 transition delay-200" />
				</span>
				<span className="rounded p-1 hover:border border-gray-100 rounded-full transition-all delay-200">
					<MdOutlineViewHeadline className="text-sm h-6 w-6 cursor-pointer text-white hover:text-emerald-400 transition delay-200" />
				</span>
			</div>
		</header>
	)
}

export default Header
