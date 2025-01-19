import { apiBlog } from "@/apiRequest/apiBlog";
import BlogDetail from "@/app/blog/[slug]/BlogDetail";
import { TBlogResponse } from "@/types/blog";
import { getIdFromSlug } from "@/utils";

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function BlogPage(props: Props) {
	const params = await props.params;

	const id = getIdFromSlug(params.slug);

	let blog: TBlogResponse;
	try {
		blog = await apiBlog.findOne(id.toString());
	} catch (error) {
		console.error(error);
		return <div>Không tìm thấy blog!</div>;
	}

	return <BlogDetail dataBlog={blog} />;
}
