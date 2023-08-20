import { useState, useEffect } from 'react'
import axios from "axios"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Link, Navigate, useParams } from "react-router-dom"
import { modules, formats, client } from "../assets/utilities"

const EditPost = () => {
	const [redirect, setRedirect] = useState(false)
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [photo, setPhoto] = useState('')
	const [content, setContent] = useState('')
	const [category, setCategory] = useState('')
	const [catId, setCatId] = useState('')
	const [catName, setcatName] = useState('')
	const { id } = useParams()

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await client.get("/categories/getCategories")
				setCategory(response.data.data)
				// console.log(response)
			} catch (error) {
				// return res.status(401).json(error)
				console.log(error)
			}
		}
		getCategories()
	}, [])
	// console.log(getCategories())
	console.log(category)
	
	//buttons
    const handleChange = (event) => {
    	if (event.target.name = "catId") {
    		setCatId(event.target.value)
    	} 
    	console.log(catId)
    }
	//register user
	const updatePost = async(event) => {
		event.preventDefault()
		const userData = new FormData()
		userData.set("title", title)
		userData.set("summary", summary)
		userData.set("content", content)
		userData.set("catId", catId)
		userData.set("catName", catName)
		userData.set("id", id)
		if (photo?.[0]) {
			userData.set("photo", photo?.[0])
		}

		try {
			const response = await fetch(`http://localhost:5000/posts/edit/${id}`, {
				method: "PUT",
				body: userData,
				credentials: "include",
			})
			console.log(response)
			if (response.ok || response.status === "200") {
				setRedirect(true)
			} 
		} catch(err) {
			if (response.status === 400) {
		        console.log("Bad request! Something went wrong please try again later");
		    } else {
		        console.log("Something went wrong please try again later")
		    }
		}
	}
	useEffect(() => {
		const getPost = async () => {
			try {
				const response = await client.get(`/posts/${id}`)
				setTitle(response.data.title)
				setSummary(response.data.summary)
				setPhoto(response.data.photo)
				setContent(response.data.content)

				setcatName(response.data.catName)
				setCatId(response.data.catId)
				// setCategory(response.data.setCategory)
			} catch (err) {
				console.log(err.stack)
				
				// if (err.message === "Network Error") {
		  //       	console.log("Connection error, Try troubleshooting your Network");
			 //    } else {
			 //        console.log(err.stack)
			 //    }
			}
		}
		getPost()
	}, [])
	if (redirect) {
		return <Navigate to={`/post/${id}`} />
	}
	

	return (
		<section className="edit_section min-h-[calc(100vh - 60px)]">
			<form onSubmit={updatePost} className="edit_form">
				<h4 className="edit_header">Edit a Post</h4>
				<select onChange={handleChange} className="create_input" name="catId" id="">
					{category.length > 0 && category.map(cat => (
						<option className="text-sm text-gray-700 font-light" key={cat._id} name={cat.name} value={cat._id}>{cat.name}</option>
					))}
				</select>
				<input type="title" value={title} onChange={event => setTitle(event.target.value)} id="title" placeholder="Enter your title" className="edit_input" />
				<input type="summary" value={summary} onChange={event => setSummary(event.target.value)} id="summary" placeholder="Enter your summary" className="edit_input" />
				<input type="file" onChange={event => setPhoto(event.target.files)} id="photo" placeholder="Enter your photo" className="edit_input" />
				<ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} formats={formats} className="w-full" />
				<button type="submit" className="edit_button">Update Post</button>
			</form>
		</section>
	)
};

export default EditPost