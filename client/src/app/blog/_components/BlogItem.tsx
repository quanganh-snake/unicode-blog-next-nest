import { TBlogResponse } from "@/types/blog";
import { generateSlugWithId } from "@/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface Props {
	data: TBlogResponse;
}

export default function BlogItem({ data }: Props) {
	return (
		<Link href={`/blog/${generateSlugWithId(data.title, data.id)}`} className="w-full flex flex-col rounded-xl shadow-xl bg-white transform duration-300 hover:scale-105">
			<div className="w-full">
				<Image src="https://images.unsplash.com/photo-1709884732297-4b3c1a3f725b" alt="blog" width={300} height={200} className="w-full rounded-t-xl" />
			</div>
			<div className="p-2">
				<h2 className="font-bold text-xl mb-4">{data.title}</h2>
				<p className="py-4 px-2 text-gray-400">{dayjs(data.created_at).format("YYYY-MM-DD")}</p>
				<div className="flex gap-x-2">
					{data.topics.map((topic, index) => (
						<p key={index} className="bg-gray-100 text-black rounded-full px-2 py-1">
							{topic}
						</p>
					))}
				</div>
			</div>
		</Link>
	);
}
