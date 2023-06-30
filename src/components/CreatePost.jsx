import { useState } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Link, Navigate } from "react-router-dom"
import { modules, formats } from "../assets/utilities"

export default function CreatePost() {
	const [redirect, setRedirect] = useState(false)
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [photo, setPhoto] = useState('')
	const [content, setContent] = useState('')
	
	//register user
	const createPost = async(event) => {
		const userData = new FormData()
		userData.set("title", title)
		userData.set("summary", summary)
		userData.set("content", content)
		userData.set("photo", photo[0])
		event.preventDefault()
		console.log(photo)
		const res = await fetch("http://localhost:5000/posts/createpost", {
			method: "POST",
			body: userData,
			credentials: "include",
			// headers: { "Content-Type": "application/json" }
		})
		console.log(await res.json())
		if (res.ok) {
			setRedirect(true)
		}
		// if (res.status === 200) {
		// 	console.log("Registration successful")
		// } else {
		// 	console.log("Sorry something went wrong! Try again later please...")
		// }
	}
	if (redirect) {
		return <Navigate to={'/'}/>
	}
	return (
		<section className="px-5 md:px-10 lg:px-20 min-h-[calc(100vh - 60px)] w-full bg-white">
			<form action="" onSubmit={createPost} className="flex flex-col w-full min-h-screen space-y-4 items-center">
				<h4 className="text-gray-600 font-bold items-center my-4">Create a Post</h4>
				<input type="title" value={title} onChange={event => setTitle(event.target.value)} id="title" placeholder="Enter your title" className="mx-auto outline-none border-2 border-gray-300 w-full bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700" />
				<input type="summary" value={summary} onChange={event => setSummary(event.target.value)} id="summary" placeholder="Enter your summary" className="mx-auto outline-none border-2 border-gray-300 w-full bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700" />
				<input type="file" onChange={event => setPhoto(event.target.files)} id="photo" placeholder="Enter your photo" className="mx-auto outline-none border-2 border-gray-300 w-full bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700" />
				{/*<textarea className="mx-auto outline-none border-2 border-gray-300 w-full bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700" name="" id="" cols="30" placeholder="Write your post here.." rows="10"></textarea>*/}
				<ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} formats={formats} className="w-full" />
				<button type="submit" className="w-full bg-green-400 rounded-md px-4 py-3 outline-none text-sm text-white hover:text-green-700 transition delay-200 hover:bg-gray-300 font-bold">Create</button>
			</form>
		</section>
	)
}

// export default CreatePost