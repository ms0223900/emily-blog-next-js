import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import TagRepo from "@/repos/tag/TagRepository";
import { SearchInputBar } from "@/app/SearchInputBar";

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
                <nav className="bg-white flex justify-start items-center m-auto max-w-[800px] py-8">
                    <Link href={"/"}>
                        <img src={"./curly-chu-logo_tiny.png"} alt={"logo"} width={100} height={100} />
                    </Link>
                    <div className={"flex gap-6 pl-10"}>
                        {tagGroups.map((tagGroup, i) => (
                            <div key={tagGroup.id + i} className="group/tagItem inline-block relative">
                                <Link className={""} href={"/"}>{tagGroup.title}</Link>
                                <ul className={"absolute top-6 hidden group-hover/tagItem:list-item"}>
                                    {tagGroup.tags.map((tag, i) => (
                                        <li key={`tag-${tag.title}-${i}`}>
                                            <Link href={`/tag/${tag.title}`}>{tag.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </nav>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
