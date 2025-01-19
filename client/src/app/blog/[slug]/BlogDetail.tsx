import { TBlogResponse } from "@/types/blog";
import React from "react";

interface Props {
	dataBlog: TBlogResponse;
}

export default function BlogDetail({ dataBlog }: Props) {
	console.log("first dataBlog:", dataBlog);
	return (
		<div>
			<div className="h-32 rounded-lg border border-gray-200 flex items-center justify-center mb-6">
				<h1>Thumbnail...</h1>
			</div>
			<div className="mb-6">
				<ul className="mb-6">
					{dataBlog.topics.map((topic, index) => (
						<li key={index} className="px-3 py-2 rounded-full bg-gray-200 inline-block">
							{topic}
						</li>
					))}
				</ul>
				<h1 className="text-xl font-bold">{dataBlog.title}</h1>
				<p>{dataBlog.content}</p>
			</div>
			<div className="">
				<h3>Related Posts</h3>
			</div>
		</div>
	);
}
