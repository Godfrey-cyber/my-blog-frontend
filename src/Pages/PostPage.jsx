import React, { useState, useEffect, useContext } from 'react'
import { useParams, useLocation, Link } from "react-router-dom"
import { UserContext } from "../UserContext"
import SideBarLeft from "../components/SideBarLeft"
import Conversations from "../components/Conversation"
import SideBarRight from "../components/SideBarRight"
import MoreFeature from "../components/MoreFeature"
import Featured from "../components/Featured"
import LoadingPage from "../components/LoadingPage"
import { format } from "date-fns"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { client } from "../assets/utilities.js"
import { selectPost, getPostsStart, getPostsSuccess, getPostsFailure } from "../Redux/Slices/postSlice.js"

const PostPage = () => {
	const { id } = useParams()
	const location = useParams()
	const [post, setPost] = useState([])

	const dispatch = useDispatch()
	// const post = useSelector(selectPost)
	console.log("post", post)
	useEffect(() => {
		const getFeatured = async () => {
			try {
				const res = await client.get(`/posts/${id}`)
				if(res.status === 200) {
					setPost(res?.data)
					console.log(res.data)
				}
			} catch (error) {
				console.log(error)
			}
		}
		getFeatured()
	}, [id])

	// const { _id, title, photo, summary, content, createdAt, author, catName } = post
	if (!post) return <LoadingPage />
	return (
		<section className="postpage_section">
		   	<SideBarLeft />
		   	<div className="lg:col-span-7 col-span-12 flex flex-col">
		   		<Featured />
				<div className="w-full flex flex-col cursor-pointer group">
					<Link to={`/post/${id}`}>
						<div className="flex flex-col space-y-4">
							<span className="flex space-y-.5 flex-col">
								<p className="text-xs font-medium text-green-600">{post?.catName}</p>
								{/*<Link to={`/post/${id}`}>*/}
								<h2 className="postpage_title">{post?.title}</h2>
								{/*</Link>*/}
								{/*<Link to={`/post/${id}`}>*/}
							</span>
							<img className="object-cover w-full" src={`https://my-blog-backend-t19h.onrender.com/${post?.photo}`} alt="" />
						</div>
					</Link>
				</div>
				<div className="w-full flex flex-col space-y-2 group">
					<div className="flex justify-between items-center text-sm my-1 font-normal text-gray-700">
						<span className="flex-col md:justify-between space-y-.5 flex md:flex-row my-3">
							<p className="postpage_p">{post?.author?.username}</p>
							<time className="text-xs text-gray-700">Posted on {post?.createdAt && format(new Date(post?.createdAt), 'MMM d, yyyy, HH:mm')}</time>
							<p className="postpage_p">@{post?.author?.username.split(" ")}</p>
						</span>
						{ post?.data?._id === post?.author?._id && (
							<Link to={`/edit/${post?._id}`} className="postpage_username">Edit Post</Link>
							)}
					</div>
					{/*<Link to={`/post/${id}`}>
						<h2 className="postpage_title">{title}</h2>
					</Link>*/}
					<p className="text-sm font-normal text-gray-700 my-4 font-semibold">{post?.summary}</p>
					
					<p className="text-sm font-light text-gray-800" dangerouslySetInnerHTML={{__html:post?.content}} />
				</div>
				<Conversations />
				<MoreFeature />
			</div>
			<SideBarRight />
		</section>
	)
}

export default PostPage