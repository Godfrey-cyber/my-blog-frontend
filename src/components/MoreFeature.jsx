import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { format } from "date-fns"
import { useSelector, useDispatch } from "react-redux"
import { client } from "../assets/utilities.js"
import { selectPost, getPostsFailure, getPostsSuccess, getPostsStart } from "../Redux/Slices/postSlice.js"
// ${import.meta.env.VITE_REACT_APP_API_URL}
const MoreFeatured = () => {
	const dispatch = useDispatch()
	const posts = useSelector(selectPost)
	return (
		<section className="flex flex-col space-y-3 w-full">
			{posts?.slice(10, 16).map(post => (
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
		</section>
	)
}

export default MoreFeatured