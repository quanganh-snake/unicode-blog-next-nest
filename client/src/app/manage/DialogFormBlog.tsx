"use client";

import { apiBlog } from "@/apiRequest/apiBlog";
import { apiTopic } from "@/apiRequest/apiTopic";
import { Topic } from "@/types/topic";
import { slugifyUtil } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type DataForm = {
	title: string;
	content: string;
	topics: number[];
};

const initialDataForm: DataForm = {
	title: "",
	content: "",
	topics: [],
};
export default function DialogFormBlog() {
	const [showDialog, setShowDialog] = useState(true);
	const [topicList, setTopicList] = useState([]);
	const [dataForm, setDataForm] = useState<DataForm>(initialDataForm);

	const onShowDialog = () => {
		setShowDialog(true);
	};

	const onChangeValue = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setDataForm({
			...dataForm,
			[name]: value,
		});
	};

	const onSelectTopic = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		const topicId = parseInt(name.split("topic_")[1]);
		if (checked) {
			setDataForm({
				...dataForm,
				topics: [...dataForm.topics, topicId],
			});
		} else {
			setDataForm({
				...dataForm,
				topics: dataForm.topics.filter((id) => id !== topicId),
			});
		}
	};

	useEffect(() => {
		const getToplicList = async () => {
			const result = await apiTopic.findAll();
			setTopicList(result);
		};
		getToplicList();
	}, []);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// console.log("data event", dataForm);

		try {
			const result = await apiBlog.create({
				...dataForm,
				slug: slugifyUtil(dataForm.title),
			});
			console.log("result", result.message[0]);
			if (!result.error) {
				alert("Thêm mới blog thành công");
				setDataForm(initialDataForm);
				setShowDialog(false);
			} else {
				alert(
					Object.keys(result.message[0])
						.map((key) => result.message[0][key])
						.join("\n")
				);
			}
		} catch (error) {
			console.error(error);
			alert("Thêm mới blog thất bại");
		}
	};

	return (
		<>
			<button onClick={onShowDialog} className="px-6 py-2 rounded-full bg-cyan-600 text-white transform duration-300 hover:opacity-65 hover:shadow-md">
				Thêm mới
			</button>
			<div className={`fixed inset-0 w-full h-full bg-gray-400/80 ${showDialog ? "flex items-center justify-center" : "hidden"}`}>
				<div className="w-full lg:w-1/2 bg-white p-2 rounded-md mx-2">
					<h3 className="font-bold uppercase text-xl">Thêm mới blog</h3>
					<hr />
					<form onSubmit={onSubmit} className="my-6">
						<div className="mb-4">
							<label htmlFor="title" className="block text-sm font-medium text-gray-700">
								Tiêu đề
							</label>
							<input type="text" id="title" name="title" onChange={onChangeValue} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
						</div>
						{/* END: Tiễu đề */}
						<div className="mb-4">
							<label htmlFor="content" className="block text-sm font-medium text-gray-700">
								Nội dung
							</label>
							<textarea id="content" name="content" onChange={onChangeValue} className="mt-1 p-2 w-full border border-gray-300 rounded-md" rows={6}></textarea>
						</div>
						{/* END: Nội dung */}
						<div className="mb-4">
							<label htmlFor="topics" className="block text-sm font-medium text-gray-700">
								Chủ đề
							</label>
							<div id="topics" className="mt-1 p-2 w-full border border-gray-300 rounded-md flex flex-row flex-wrap gap-4">
								{topicList.map((topic: Topic) => (
									<label key={topic.id} htmlFor={`topic_${topic.id}`} className="flex items-center gap-2">
										<input type="checkbox" onChange={onSelectTopic} id={`topic_${topic.id}`} name={`topic_${topic.id}`} />
										{topic.name}
									</label>
								))}
							</div>
						</div>
						{/* END: Chủ đề */}
						<div className="">
							<label htmlFor="image" className="flex w-32 h-32 border rounded-md items-center justify-center hover:bg-gray-100 cursor-pointer">
								Hình ảnh
							</label>
							<input type="file" name="" id="image" accept="image/jpg" hidden />
						</div>
						<div className="flex justify-end mt-4">
							<button type="button" onClick={() => setShowDialog(false)} className="px-6 py-2 rounded-full bg-red-600 text-white transform duration-300 hover:opacity-65 hover:shadow-md">
								Hủy
							</button>
							<button type="submit" className="px-6 py-2 rounded-full bg-cyan-600 text-white transform duration-300 hover:opacity-65 hover:shadow-md ml-6">
								Lưu
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
