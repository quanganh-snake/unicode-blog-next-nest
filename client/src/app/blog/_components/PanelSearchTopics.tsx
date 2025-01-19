"use client";

import { apiTopic } from "@/apiRequest/apiTopic";
import { TFilterBlog } from "@/types/blog";
import { Topic } from "@/types/topic";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
	dataSearch: TFilterBlog;
	setDataSearch: (value: TFilterBlog) => void;
}

export default function PanelSearchTopics({ dataSearch, setDataSearch }: Props) {
	const [topics, setTopics] = useState<Topic[]>([]);

	useEffect(() => {
		const getTopics = async () => {
			const response = await apiTopic.findAll();
			setTopics(response);
		};
		getTopics();
	}, []);

	return (
		<div className="flex flex-col gap-y-2">
			<div className="relative w-1/3 border-2 border-gray-300 rounded-full pl-14 py-4 bg-white mb-6">
				<Search className="absolute left-4 top-4 text-gray-400" />
				<input
					type="text"
					name=""
					value={dataSearch.keyword}
					onChange={(e) => {
						const value = e.target.value;
						setDataSearch({
							...dataSearch,
							keyword: value,
						});
					}}
					className="w-full bg-transparent focus:outline-none"
					placeholder="Search posts"
				/>
			</div>
			<div className="">
				<div className="flex items-center gap-x-10 mb-4">
					<h3 className="font-bold text-xl">Search by topics</h3>
					<span
						className={`inline-block text-xs ${dataSearch.topicIds.length > 0 ? "text-black hover:text-red-600" : "text-gray-200"} cursor-pointer`}
						onClick={() => {
							setDataSearch({
								...dataSearch,
								topicIds: [],
								page: 1,
								limit: 1,
							});
						}}
					>
						Clear All
					</span>
				</div>
				<div className="w-1/2 flex flex-wrap gap-x-6 gap-y-5">
					{topics.map((topic, index) => {
						return (
							<span
								key={index}
								onClick={() => {
									setDataSearch((prev: TFilterBlog) => {
										let topicIds = [...prev.topicIds];
										if (topicIds.includes(topic.id.toString())) {
											topicIds = topicIds.filter((id) => id !== topic.id.toString());
										} else {
											topicIds.push(topic.id.toString());
										}
										return {
											...prev,
											topicIds,
											page: 1,
											limit: 1,
										};
									});
								}}
								className={`px-4 py-2 bg-gray-200 rounded-full cursor-pointer border-2 border-transparent transition-all duration-300 hover:ring-2 hover:ring-offset-4 hover:ring-red-400 ${
									dataSearch.topicIds.includes(topic.id.toString()) ? "bg-red-400 text-white" : "text-gray-600"
								}`}
							>
								{topic.name}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
}
