/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link"
import { SingleTagGroup } from "@/repos/tag/types"

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

export default MobileNavBar;
