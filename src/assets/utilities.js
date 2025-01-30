import axios from "axios"

export const modules = {
	    toolbar: [
		    [{ 'header': [1, 2, false] }],
		    ['bold', 'italic', 'underline','strike', 'blockquote'],
		    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
		    ['link', 'image'],
		    ['clean']
	    ],
  	} 

export const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

export const client = axios.create({
	baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1`,
	withCredentials: true
});