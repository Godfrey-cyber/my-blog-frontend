import React from 'react'

const SideBarRignt = () => {
	return (
		<section className="hidden md:inline-flex flex-col w-full col-span-3">
			{/*<span className="font-bold text-lg text-gray-800 transition delay-400 cursor-pointer hover:text-green-700 my-4">MyBlog Pro</span>*/}
			<div className="bg-green-100 flex-col rounded-md p-4 space-y-3">
				<p className="text-xl font-semibold">Join <span className="cursor-pointer text-green-700 transition delay-400">MyBlog Pro</span> to access member only Blogs</p>
				<button className="bg-green-300 p-2 rounded-sm w-full font-semibold text-sm text-gray-900">Join Now</button>
			</div>
		</section>
	)
}

export default SideBarRignt