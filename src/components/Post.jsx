import React from 'react'
import { format } from "date-fns"
import { Link } from "react-router-dom"

const Post = ({ _id, title, photo, summary, content, createdAt, author }) => {
	return (
		<div className="grid grid-cols-12 cursor-pointer group px-5 lg:px-20 md:px-10 my-6">
			<div className="lg:col-span-4 col-span-12 h-[150px] w-[150px] md:h-[250px] md:w-[250px] rounded-sm">
				<Link to={`/post/${_id}`}>
					<img className="w-full h-full object-cover rounded-sm" src={`http://localhost:5000/${photo}`} alt="" />
				</Link>
			</div>
			<div className="lg:col-span-6 flex col-span-12 flex-col space-y-2 p-3">
				<Link to={`/post/${_id}`}>
					<h2 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition delay-300">{title}</h2>
				</Link>
				<p className="text-sm font-normal text-gray-700">{summary}</p>
				<div className="text-sm font-normal text-gray-700">
					<span className="flex space-x-4">
						<p className="text-xs text-gray-400 text-green-600 font-bold">{author?.username}</p>
						<time className="text-xs text-gray-600">{format(new Date(createdAt), 'MMM d, yyyy, HH:mm')}</time>
					</span>
				</div>
				{/*<p className="text-sm font-normal text-gray-700" dangerouslySetInnerHTML={{__html:content}} />*/}
			</div>
		</div>
	)
}

export default Post