import React, { useState, useEffect, useContext } from 'react'
import { useParams, useLocation, Link } from "react-router-dom"
import { UserContext } from "../UserContext"
import SideBarLeft from "../components/SideBarLeft"
import Conversations from "../components/Conversation"
import SideBarRight from "../components/SideBarRight"
import MoreFeature from "../components/MoreFeature"
import Featured from "../components/Featured"
import { format } from "date-fns"

const PostPage = () => {
	const [postData, setPostData] = useState([])
	const { id } = useParams()
	const location = useParams()
	const { setUserData, userData } = useContext(UserContext)

	useEffect(() => {
		fetch(`https://my-blog-backend-t19h.onrender.com/posts/${id}`).then(response => {
			response.json().then(post => setPostData(post))
		})
	}, [id])
	const { _id, title, photo, summary, content, createdAt, author, catName } = postData
	if (!postData) return ""
	return (
		<section className="postpage_section">
		   	<SideBarLeft />
		   	<div className="lg:col-span-7 col-span-12 flex flex-col">
		   	<Featured />
				<div className="w-full flex flex-col cursor-pointer group">
					<Link to={`/post/${id}`}>
						<div className="flex flex-col space-y-4">
							<span className="flex space-y-.5 flex-col">
								<p className="text-xs font-medium text-green-600">{catName}</p>
								{/*<Link to={`/post/${id}`}>*/}
								<h2 className="postpage_title">{title}</h2>
								{/*</Link>*/}
								{/*<Link to={`/post/${id}`}>*/}
							</span>
							<img className="object-cover w-full" src={`http://localhost:5000/${photo}`} alt="" />
						</div>
					</Link>
				</div>
				<div className="w-full flex flex-col space-y-2 group">
					<div className="flex justify-between items-center text-sm my-1 font-normal text-gray-700">
						<span className="flex-col space-y-.5 md:flex my-3">
							<p className="postpage_p">{author?.username}</p>
							<time className="text-xs text-gray-700">Posted on {createdAt && format(new Date(createdAt), 'MMM d, yyyy, HH:mm')}</time>
							<p className="postpage_p">@{author?.username.split(" ")}</p>
						</span>
						{ userData?.data?._id === postData?.author?._id && (
							<Link to={`/edit/${postData._id}`} className="postpage_username">Edit Post</Link>
							)}
					</div>
					{/*<Link to={`/post/${id}`}>
						<h2 className="postpage_title">{title}</h2>
					</Link>*/}
					<p className="text-sm font-normal text-gray-700 my-4 font-semibold">{summary}</p>
					
					<p className="text-sm font-light text-gray-800" dangerouslySetInnerHTML={{__html:content}} />
				</div>
				<Conversations />
				<MoreFeature />
			</div>
			<SideBarRight />
		</section>
	)
}

export default PostPage