import React from 'react'
import Header from "./Header"
import {Outlet} from "react-router-dom"

const Layout = () => {
	return (
		<main className="font-['Roboto'] min-h-screen w-full bg-gray-50 overflow-x-hidden">
			<Header />
			<Outlet />
		</main>
	)
}

export default Layout

