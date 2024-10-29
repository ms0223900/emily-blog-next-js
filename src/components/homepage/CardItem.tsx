import React from 'react';
import { Tag } from "@/components/homepage/Tag";
import Link from "next/link";
import { getPostLink } from "@/app/post/utils";
import { Tag as TagType } from "common-types";

export interface CardItemProps {
    id: string;
    tag: TagType;
    title: string;
    intro: string;
    thumbnailImg: string;
}

const CardItem: React.FC<CardItemProps> = (props) => {
    return (
        <li className={""}>
            <Link
                className={"flex flex-col items-start gap-2 justify-stretch h-full p-6 pt-0 bg-white text-black border rounded-xl"}
                href={getPostLink(props.id)}>
                <div className={"w-full h-[240px] overflow-hidden rounded-xl"}>
                    <img className={"block object-cover w-full h-full object-top"} src={props.thumbnailImg}
                        alt={"thumbnailImg"} />
                </div>
                <Tag tag={props.tag} />
                <h3 className={'text-2xl line-clamp-2 leading-normal'}>{props.title}</h3>
                <p className={'w-full line-clamp-4'}>{props.intro}</p>
            </Link></li>
    );
};

export default CardItem;
