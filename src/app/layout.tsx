/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import TagRepo from "@/repos/tag/TagRepository";
import { SingleTagGroup } from "@/repos/tag/types";
import RwdComponent from "@/components/common/RwdComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Emily's Blog",
    description: "Emily is here!",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tagGroups = await TagRepo.getTagGroups();

    return (
        <html lang="en">
            <body className={inter.className}>
                <RwdComponent
                    mobileComponent={<MobileNavBar tagGroups={tagGroups} />}
                    desktopComponent={<NavBar tagGroups={tagGroups} />}
                />

                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}

const MobileNavBar = ({ tagGroups }: { tagGroups: SingleTagGroup[] }) => {
    return (
        <div className="sticky top-0 left-0 w-full bg-white shadow-md z-50 group">
            <div className="flex justify-between items-center p-4">
                <Link href="/">
                    <img
                        src="./curly-chu-logo_tiny.png"
                        alt="logo"
                        width={60}
                        height={60}
                    />
                </Link>

                <label className="p-2 focus:outline-none cursor-pointer">
                    <input name="menu" type="checkbox" className="hidden peer" />
                    <svg
                        className="w-6 h-6 text-gray-800 peer-checked:hidden"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    <svg
                        className="w-6 h-6 text-gray-800 hidden peer-checked:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out hidden peer-checked:block translate-x-0 z-50 overflow-y-auto">
                        {tagGroups.map((tagGroup, i) => (
                            <div key={tagGroup.id + i} className="mb-4 p-4">
                                <div className="font-medium text-gray-800 py-2 border-b">
                                    {tagGroup.title}
                                </div>
                                <ul className="pl-2 mt-2">
                                    {tagGroup.tags.map((tag, i) => (
                                        <li key={`tag-${tag.title}-${i}`} className="py-2">
                                            <Link
                                                href={`/tag/${tag.id}`}
                                                className="block text-gray-700 hover:text-blue-600 px-2 py-1 rounded hover:bg-gray-100"
                                            >
                                                {tag.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </label>

            </div>


        </div>
    );
}

const NavBar = ({ tagGroups }: { tagGroups: SingleTagGroup[] }) => {
    return (
        <nav className="bg-white flex justify-start items-center m-auto max-w-[800px] py-8">
            <Link href={"/"}>
                <img src={"./curly-chu-logo_tiny.png"} alt={"logo"} width={100} height={100} />
            </Link>
            <div className="flex gap-6 pl-10">
                {tagGroups.map((tagGroup, i) => (
                    <div
                        key={tagGroup.id + i}
                        className="p-2 group/tagItem relative rounded-md hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Link
                            href="/"
                            className="text-gray-800 hover:text-blue-600 font-medium"
                        >
                            {tagGroup.title}
                        </Link>
                        <ul className="absolute top-full left-0 mt-0.5 hidden group-hover/tagItem:block w-full bg-white shadow-lg rounded-md py-1 z-10">
                            {tagGroup.tags.map((tag, i) => (
                                <li key={`tag-${tag.title}-${i}`}>
                                    <Link
                                        href={`/tag/${tag.id}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        {tag.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </nav>
    )
}
