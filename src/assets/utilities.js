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
	baseURL: "http://localhost:5000",
	// withCredentials: true
});

export const getCategories = async () => {
	try {
		const response = await client.get("/categories/getCategories")
		return response
	} catch (error) {
		console.log(error.message)
	}
	// return response;
}