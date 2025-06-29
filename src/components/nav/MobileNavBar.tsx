/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link"
import { SingleTagGroup } from "@/repos/tag/types"
import { useState } from "react"

const MobileNavBar = ({ tagGroups }: { tagGroups: SingleTagGroup[] }) => {
    const [isOpen, setIsOpen] = useState(false)

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

                <button
                    className="p-2 focus:outline-none cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {!isOpen ? (
                        <svg
                            className="w-6 h-6 text-gray-800"
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
                    ) : (
                        <svg
                            className="w-6 h-6 text-gray-800"
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
                    )}
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto">
                            <div className="flex justify-end pt-4 pr-2">
                                <button
                                    className="p-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-800"
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
                                </button>
                            </div>
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
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {tag.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MobileNavBar;
