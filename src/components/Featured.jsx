import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

const Featured = () => {
	const [featuredPosts, setFeaturedPosts] = useState([])
	const { id } = useParams()
	useEffect(() => {
		fetch("https://my-blog-backend-t19h.onrender.com/posts/allposts").then(res => {
			res.json().then(data => {
				setFeaturedPosts(data)
				// console.log(featuredPosts)
			})
		})
	}, [])
	return (
		<section className="grid grid-cols-12 gap-y-3 md:gap-y-0 md:gap-x-4 w-full my-4 md:my-0">
			<div className="lg:col-span-8 col-span-12 flex flex-col space-y-2 w-full">
				{featuredPosts?.slice(1,2).map(post => (
					<div className="flex flex-col space-y-3" key={post._id}>
						<span className="flex flex-col space-y-3">
							<h3 className="text-green-600 text-xs">{post.catName}</h3>
							<h3 className="text-4xl font-extrabold text-black leading-9 cursor-pointer">{post.title}</h3>
							<p className="text-xs text-gray-500 hover:text-green-400 transition delay-300 cursor-pointer">{post.author.username}</p>
						</span>
						<div className="w-full h-[300px]">
							<img className="w-full h-full object-cover" src={`https://my-blog-backend-t19h.onrender.com/${post.photo}`} alt={post.photo} />
						</div>
					</div>
				))}
			</div>
			<div className="col-span-12 lg:col-span-4 flex flex-col space-y-3 lg:space-y-1">
				{featuredPosts.slice(3, 7).map(post => (
					<Link to={`/post/${post._id}`}>
						<span className="flex flex-col space-y-2 cursor-pointer hover:bg-gray-100 transition delay-200 p-1 rounded-sm">
							<h3 className="text-green-600 text-xs">{post.catName}</h3>
							<p className="text-black text-lg font-bold leading-5">{post.title.length > 61 ? post.title.substring(0, 61) : post.title}...</p>
							<h3 className="text-gray-700 text-xs hover:text-green-400 transition delay-300 cursor-pointer my-3 lg:my-0">{post.author.username}</h3>
							<hr className="border border-gray-300 my-1" />
						</span>
					</Link>
				))}
			</div>
		</section>
	)
}

export default Featured