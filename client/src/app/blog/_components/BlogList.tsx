"use client";

import { apiBlog } from "@/apiRequest/apiBlog";
import BlogItem from "@/app/blog/_components/BlogItem";
import PanelSearchTopics from "@/app/blog/_components/PanelSearchTopics";
import { TBlogResponse, TFilterBlog } from "@/types/blog";
import { useEffect, useState } from "react";

export default function BlogList() {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<TBlogResponse[]>([]);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		totalItems: 0,
		totalPages: 0,
	});
	const [dataSearch, setDataSearch] = useState<TFilterBlog>({
		keyword: "",
		topicIds: [],
		page: 1,
		limit: 1,
	});

	useEffect(() => {
		const fetchBlogs = async () => {
			const results = await apiBlog.findAll(dataSearch);
			const data = await results.data;
			const pagination = await results.pagination;
			setBlogs(data);
			setPagination({
				...pagination,
			});
			setLoading(false);
		};
		fetchBlogs();
	}, [dataSearch]);

	console.log("pagination", pagination);

	return (
		<>
			<PanelSearchTopics dataSearch={dataSearch} setDataSearch={setDataSearch} />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 py-6">
				{loading && <p>Loading...</p>}
				{blogs.map((blog) => (
					<BlogItem key={blog.id} data={blog} />
				))}
			</div>
			<div className="">
				{pagination.totalPages > 1 && (
					<div className="flex justify-center gap-x-4 mt-6">
						<button
							className={`px-4 py-2 bg-gray-200 rounded-full ${pagination.page <= 1 ? "cursor-not-allowed" : "hover:bg-sky-200"}`}
							onClick={() => {
								if (pagination.page > 1) {
									setDataSearch({
										...dataSearch,
										page: pagination.page - 1,
									});
								}
							}}
						>
							Prev
						</button>
						{Array(pagination.totalPages)
							.fill(1)
							.map((_, index) => (
								<button
									key={index}
									className={`px-4 py-2 rounded-full hover:bg-red-200 ${pagination.page === index + 1 ? "bg-red-600 text-white" : ""}`}
									onClick={() => {
										setDataSearch({
											...dataSearch,
											page: index + 1,
										});
									}}
								>
									{index + 1}
								</button>
							))}
						<button
							className={`px-4 py-2 bg-gray-200 rounded-full ${pagination.page >= pagination.totalPages ? "cursor-not-allowed" : "hover:bg-sky-200"}`}
							onClick={() => {
								if (pagination.page < pagination.totalPages) {
									setDataSearch({
										...dataSearch,
										page: pagination.page + 1,
									});
								}
							}}
						>
							Next
						</button>
					</div>
				)}
			</div>
		</>
	);
}
