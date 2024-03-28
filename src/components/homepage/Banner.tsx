'use client'

import React from 'react';
import { Tag } from "@/components/homepage/Tag";
import { Post } from "@/repos/post/types";
import Link from "next/link";
import { getPostLink } from "@/app/post/utils";

export interface BannerProps extends Pick<Post, 'id' | 'title' | 'thumbnail'> {
    title: string;
    intro: Post['description']
}

const Banner: React.FC<BannerProps> = (props) => {
    return (
        <Link href={getPostLink(props.id)}>
            <div className={"bg-amber-400 w-full h-[600px] relative rounded-lg overflow-hidden"}>
                <img className={"w-full block h-auto"} alt={"banner-bg"}
                     src={props.thumbnail} />
                <div
                    className={"max-w-[633px] p-10 pb-8 bg-white text-black rounded-2xl absolute left-16 bottom-4 flex flex-col gap-4 items-start"}>
                    <Tag tag={"Travel"} />
                    <h2 className={"text-3xl font-bold"}>
                        {props.title}
                    </h2>
                    <p className={"text-lg font-light"}>
                        {props.intro}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Banner;
