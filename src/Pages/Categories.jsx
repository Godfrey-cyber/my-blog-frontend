import { useState, useEffect } from 'react'
import SideBarLeft from "../components/SideBarLeft"
import { useParams } from "react-router-dom"
import { client } from "../assets/utilities"
import Post from "../components/Post"
import CategoryPost from "../components/CategoryPost"

const Categories = () => {
	const [category, setCategory] = useState('')
	const [posts, setPosts] = useState([])
	const { id } = useParams()

	// useEffect(() => {
		// const getCategory = async () => {
		// 	try {
		// 		const response = await client.get(`/categories/getCategory/${id}`)
		// 		setCategory(response.data.data)
		// 		console.log(response)
		// 	} catch (error) {
		// 		// return res.status(401).json(error)
		// 		console.log(error)
		// 	}
		// }
		useEffect(() => {
			fetch(`https://my-blog-backend-t19h.onrender.com/categories/getCategory/${id}`).then(response => {
				response.json().then(cat => setCategory(cat.data))
			}).catch(err => console.log(err))
			console.log(category)
		}, [id])

		useEffect(() => {
			fetch(`https://my-blog-backend-t19h.onrender.com/posts/getByCategory/${id}`).then(res => {
				res.json().then(data => {
					setPosts(data.data)
					console.log(data.data)
				})
			})
		}, [id])
		// getCategory()
	// }, [])
	return (
		<section className="grid grid-cols-12 px-5 md:px-10 lg:px-20 my-4 w-full bg-white min-h-[calc(100vh - 60px)]">
			<div className="col-span-2 flex flex-col">
				<SideBarLeft />
			</div>
			<div className="flex flex-col col-span-12 md:col-span-7 p-2 space-y-2 w-full">
				<span className="flex flex-col space-y-3 w-full">
					<h3 className="font-bold text-gray-900 text-6xl">{category.name}</h3>
					<p className="font-light text-gray-900 w-full md:w-3/5 text-sm">{category.desc}</p>
					<hr className="border-b border-gray-300" />
				</span>
				<div className="flex flex-col w-full space-y-3">
					{posts?.length > 0 && posts.map(post => (
						<CategoryPost {...post} key={post._id} />
					))}
				</div>
			</div>
		</section>
	)
}

export default Categories