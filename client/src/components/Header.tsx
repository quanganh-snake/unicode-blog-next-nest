"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{
		id: 1,
		title: "Home",
		url: "/",
	},
	{
		id: 2,
		title: "Blog",
		url: "/blog",
	},
];

export default function Header() {
	const pathname = usePathname();

	return (
		<header className="container py-4 flex items-center justify-between">
			<Link href={"/"} className="brand font-bold text-3xl">
				QuangAnh.io
			</Link>
			<nav className="flex space-x-6">
				{navItems.map((item) => {
					const isActiveNav = pathname === item.url;
					return (
						<Link
							key={item.id}
							href={item.url}
							className={`font-semibold text-lg ${
								isActiveNav ? "text-black" : "text-gray-500"
							} text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300`}
						>
							{item.title}
							<span className={`block h-0.5 bg-black transition-all duration-300 group-hover:max-w-full dark:bg-white ${isActiveNav ? "max-w-full" : "max-w-0"}`}></span>
						</Link>
					);
				})}
			</nav>
		</header>
	);
}
