import React, { useState, useEffect, useContext } from 'react'
import { useParams, useLocation, Link } from "react-router-dom"
import { UserContext } from "../UserContext"
import { format } from "date-fns"

const PostPage = () => {
	const [postData, setPostData] = useState([])
	const { id } = useParams()
	const location = useParams()
	const { setUserData, userData } = useContext(UserContext)
	useEffect(() => {
		fetch(`http://localhost:5000/posts/${id}`).then(response => {
			response.json().then(post => setPostData(post))
		})
	}, [])
	console.log(postData?.author?._id)
	const { _id, title, photo, summary, content, createdAt, author } = postData
	if (!postData) return ""
	return (
		<div className="grid grid-rows-12 grid-flow-row gap-8 group px-5 lg:px-20 md:px-10 my-6">
			<div className="col-span-2">
				<Link to={`/post/${id}`}>
					<img className="w-full" src={`http://localhost:5000/${photo}`} alt="" />
				</Link>
			</div>
			<div className="col-span-2 lg:col-span-4 flex flex-col space-y-2">
				<div className="text-sm my-1 font-normal text-gray-700">
					<span className="flex space-x-4">
						<p className="text-xs text-gray-400 text-green-600 cursor-pointer font-bold">{author?.username}</p>
							<time className="text-xs text-gray-600">{createdAt && format(new Date(createdAt), 'MMM d, yyyy, HH:mm')}</time>
					</span>
					{ userData?.data?._id === postData?.author?._id && (
						<Link to={`/edit/${postData._id}`} className="inline-flex text-sm font-normal hover:font-semibold text-white transition delay-300 px-2 py-1 bg-green-400 rounded-md cursor-pointer">Edit Post</Link>
						)}
				</div>
				<Link to={`/post/${id}`}>
					<h2 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition delay-300">{title}</h2>
				</Link>
				<p className="text-sm font-normal text-gray-700">{summary}</p>
				
				<p className="text-sm font-normal text-gray-700" dangerouslySetInnerHTML={{__html:content}} />
			</div>
		</div>
	)
}

export default PostPage