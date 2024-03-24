import React from 'react';
import { Tag } from "@/components/homepage/Tag";
import Link from "next/link";
import { getPostLink } from "@/app/post/utils";

export interface CardItemProps {
    id: string;
    tag: string;
    title: string;
    intro: string;
    thumbnailImg: string;
}

const CardItem: React.FC<CardItemProps> = (props) => {
    return (
        <li className={""}>
            <Link
                className={"flex flex-col items-start gap-2 p-6 pt-0 bg-white text-black border rounded-xl"}
                href={getPostLink(props.id)}>
                <img className={"block w-full h-auto rounded-xl"} src={props.thumbnailImg} alt={"thumbnailImg"} />
                <Tag tag={props.tag} />
                <h3 className={'text-3xl'}>{props.title}</h3>
                <p className={'w-full line-clamp-4'}>{props.intro}</p>
            </Link></li>
    );
};

export default CardItem;
