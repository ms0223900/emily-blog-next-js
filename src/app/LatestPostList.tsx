import React from 'react';
import PostRepository from '@/repos/post/PostRepository';
import Link from 'next/link';
import { getPostLink } from '@/app/post/utils';
import { cn } from '@/styles/helpers';

export async function LatestPostList() {
    const posts = await PostRepository.getPosts();
    const latestPosts = posts.slice(0, 3);

    return (
        <div className="w-full">
            <div className="flex items-center  text-xl">
                <h2 className={cn("bg-primary p-1  font-bold text-white", "inline-block")}>
                    Popular
                </h2>
                <span className="font-medium px-2 text-gray-800">
                    Posts
                </span>
            </div>
            <div className="mt-6 flex flex-col gap-6">
                {latestPosts.map((post) => (
                    <div key={post.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex gap-1 mb-2">
                            {post.tagList.slice(0, 1).map(tag => (
                                <Link
                                    key={tag.id}
                                    href={`/tag/${tag.id}`}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                                >
                                    {tag.title}
                                </Link>
                            ))}
                        </div>
                        <Link href={getPostLink(post.id)} className="block">
                            <h3 className="text-xl font-bold mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
                                {post.title}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">

                            <time dateTime={post.createdAt}>
                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </time>
                        </div>
                        <p className="text-gray-600 line-clamp-3">
                            {post.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
