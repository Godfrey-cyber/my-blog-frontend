import React from 'react'
import { format } from "date-fns"
import { Link } from "react-router-dom"

const Post = ({ _id, title, photo, summary, content, createdAt, author, catName }) => {
	return (
		<div className="grid grid-cols-12 px-5 lg:px-20 md:px-10 my-6 gap-4 group">
	{/*img & title*/}
			<div className="grid grid-cols-12 flex flex-col gap-x-3">

			</div>
			<div className="post_img_div">
				<Link to={`/post/${_id}`}>
					<img className="post_img" src={`http://localhost:5000/${photo}`} alt={`http://localhost:5000/${photo}`} />
				</Link>
			</div>
		{/*title*/}
			<div className="flex flex-col space-y-1 lg:col-span-3 col-span-12 cursor-pointer">
				<p className="text-xs font-medium text-green-600">{catName}</p>
				<Link to={`/post/${_id}`}>
					<h2 className="w-fulll text-xl font-bold text-gray-800 group-hover:text-green-600 transition delay-300">{title}</h2>
				</Link>
			</div>
		{/*summary*/}
			<div className="flex flex-col space-y-3 col-span-12 lg:col-span-4 w-full">
				<p className="text-sm font-normal text-gray-700">{summary.substring(0, 200)}...</p>
				<div className="text-sm font-normal text-gray-700">
					<span className="flex space-x-4">
						<p className="text-xs text-gray-400 text-green-600 font-bold">{author?.username}</p>
						<time className="text-xs text-gray-600">{format(new Date(createdAt), 'MMM d, yyyy, HH:mm')}</time>
					</span>
				</div>
			</div>
		</div>
	)
}

export default Post