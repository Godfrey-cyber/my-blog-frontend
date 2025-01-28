import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { format } from "date-fns"
import { useSelector, useDispatch } from "react-redux"
import { client } from "../assets/utilities.js"
import { getPostsFailure, getPostsSuccess, getPostsStart } from "../Redux/Slices/postSlice.js"

const MoreFeatured = () => {
	const [featuredPosts, setFeaturedPosts] = useState([])
	const dispatch = useDispatch()
	useEffect(() => {
		const getMoreFeatured = async () => {
			try {
				dispatch(getPostsStart())
				const response = await client.get("/posts/allposts")
				setFeaturedPosts(response?.data?.data)
				dispatch(getPostsSuccess(response?.data?.data))
				// console.log(response)
			} catch (error) {
				// return res.status(401).json(error)
				console.log(error)
				dispatch(getPostsFailure(error.message))
			}
		}
		getMoreFeatured()
	}, [])
	return (
		<section className="flex flex-col space-y-3 w-full">
			{/*<div className="col-span-8 flex flex-col space-y-2">
				{featuredPosts.slice(4,5).map(post => (
					<div className="flex flex-col space-y-3" key={post._id}>
						<span className="flex flex-col space-y-3">
							<h3 className="text-4xl font-extrabold text-black leading-9 cursor-pointer">{post.title}</h3>
							<p className="text-xs text-gray-500 hover:text-green-400 transition delay-300 cursor-pointer">{post.author.username}</p>
						</span>
						<div className="w-full h-[300px]">
							<img className="w-full h-full object-cover" src={`http://localhost:5000/${post.photo}`} alt={post.photo} />
						</div>
					</div>
				))}
			</div>*/}
			{/*<div className="col-span-4 flex flex-col space-y-1">*/}
				{featuredPosts.slice(10, 16).map(post => (
					<Link key={post._id} to={`/post/${post._id}`}>
						<div className="grid grid-cols-12 w-full gap-y-10 lg:gap-y-0 md:gap-x-4 group">
							{/*img & title*/}
							<div className="post_img_div">
								<p className="md:hidden text-xs font-medium text-green-600 my-2">{post.catName}</p>
								<Link to={`/post/${post._id}`}>
									<img className="post_img" src={`https://my-blog-backend-t19h.onrender.com/${post.photo}`} alt="" />
								</Link>
							</div>
							{/*title*/}
							<div className="flex flex-col space-y-4 lg:col-span-4 col-span-12 cursor-pointer">
								<span className="flex flex-col space-y-1">
									<p className="hidden lg:inline-flex text-xs font-medium text-green-600">{post.catName}</p>
									<Link to={`/post/${post._id}`}>
									<h2 className="w-fulll text-xl font-bold text-gray-800 group-hover:text-green-600 transition delay-300 leading-6">{post.title}</h2>
									</Link>
								</span>
								<div className="text-sm font-normal text-gray-700">
									<span className="flex space-x-4">
										<p className="text-xs text-gray-400 text-green-600 font-bold">{post.author?.username}</p>
										<time className="text-xs text-gray-600">{format(new Date(post.createdAt), 'MMM d, yyyy, HH:mm')}</time>
									</span>
								</div>
							</div>
							{/*summary*/}
							<div className="hidden md:inline-flex flex-col space-y-3 cool-span-12 lg:col-span-5">
								<p className="text-sm font-normal text-gray-700">{post.summary.substring(0, 200)}...</p>
								{/*<div className="text-sm font-normal text-gray-700">
									<span className="flex space-x-4">
										<p className="text-xs text-gray-400 text-green-600 font-bold">{post.author?.username}</p>
										<time className="text-xs text-gray-600">{format(new Date(post.createdAt), 'MMM d, yyyy, HH:mm')}</time>
									</span>
								</div>*/}
							</div>
						</div>
					</Link>
				))}
			{/*</div>*/}
		</section>
	)
}

export default MoreFeatured