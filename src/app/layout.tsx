/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import TagRepo from "@/repos/tag/TagRepository";
import { SingleTagGroup } from "@/repos/tag/types";

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
                <NavBar tagGroups={tagGroups} />

                <main>
                    {children}
                </main>
            </body>
        </html>
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
