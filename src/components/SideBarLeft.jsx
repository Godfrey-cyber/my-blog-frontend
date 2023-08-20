import { useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom"
import { client } from "../assets/utilities"
import Categories from "../Pages/Categories"

const SideBarLeft = () => {
	const [category, setCategory] = useState('')
	const [catId, setCatId] = useState('')
	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await client.get("/categories/getCategories")
				setCategory(response.data.data)
				// console.log(response)
			} catch (error) {
				// return res.status(401).json(error)
				console.log(error)
			}
		}
		getCategories()
	}, [])

	const handleClick = (event) => {
    	// if (event.target.name = "catId") {
    		setCatId(event.target.value)
    	// } 
    	console.log(catId)
    }
	return (
		<section className="hidden lg:inline-flex flex-col w-full col-span-2">
			<span className="font-bold text-lg text-gray-800 transition delay-400 cursor-pointer hover:text-green-700 my-4">MyBlog Pro</span>
			<div className="flex flex-col space-y-1">
				<span className="">
					<p className="text-sm text-gray-700 font-normal cursor-pointer transition delay-400 hover:text-green-700">Search</p>
				</span>
				<div onClick={handleClick} className="w-full flex flex-col space-y-1">
					{category?.length > 0 && category.map(cat => (
						<Link key={cat._id} to={`/categories/${cat._id}`}>
							<p className="text-lg text-gray-700 font-light" key={cat._id} value={cat._id}>{cat.name}</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}

export default SideBarLeft