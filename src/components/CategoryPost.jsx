import React from 'react'
import { format } from "date-fns"
import { Link } from "react-router-dom"

const CategoryPost = ({ _id, title, photo, summary, content, createdAt, author, catName }) => {
	const length = 3;
	const myString = "ABCDEFG";
	const myTruncatedString = myString.substring(0,length);
	return (
		<div className="grid grid-cols-12 my-6 gap-4 w-full group border-b border-gray-300 group">
			{/*title*/}
			<div className="flex flex-col space-y-1 lg:col-span-4 col-span-12 cursor-pointer">
				<p className="text-xs font-medium text-green-600">{catName}</p>
				<Link to={`/post/${_id}`}>
					<h2 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition group-hover:text-gray-400 delay-300">{title}</h2>
				</Link>
				<span className="flex flex-col space-y-1">
					<p className="text-xs text-gray-400 text-green-600 font-bold">{author?.username}</p>
					<time className="text-xs text-gray-600 group-hover:text-gray-400 delay-300">{format(new Date(createdAt), 'MMM d, yyyy, HH:mm')}</time>
				</span>
			</div>
			{/*summary*/}
			<div className="flex flex-col space-y-4 col-span-4">
				<p className="hidden lg:inline-flex text-sm font-normal text-gray-700" dangerouslySetInnerHTML={{__html:content.substring(0, 200)}} />
				<div className="text-sm font-normal text-gray-700">
					
				</div>
			</div>
			
			{/*img*/}
			<div className="post_img_div">
				<Link to={`/post/${_id}`}>
					<img className="post_img" src={`http://localhost:5000/${photo}`} alt="" />
				</Link>
			</div>
			<br className="border-b border-gray-300" />
		</div>
	)
}

export default CategoryPost