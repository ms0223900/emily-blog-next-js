'use client'

import React from 'react';
import { Tag } from "@/components/homepage/Tag";

export interface BannerProps {
    title: string;
    intro: string;

}

const Banner: React.FC<BannerProps> = (props) => {
    return (
        <div className={"bg-amber-400 w-[1200px] h-[600px] relative rounded-lg overflow-hidden"}>
            <img className={"w-100 block h-auto"} alt={"banner-bg"}
                 src={"https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?q=65&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
            <div className={"max-w-[633px] p-10 pb-8 bg-white text-black rounded-2xl absolute left-16 bottom-4"}>
                <Tag tag={"Travel"}/>
                <h2 className={"text-3xl pb-4 font-bold"}>
                    {props.title}
                </h2>
                <p className={"text-lg font-light"}>
                    {props.intro}
                </p>
            </div>
        </div>
    );
};

export default Banner;
