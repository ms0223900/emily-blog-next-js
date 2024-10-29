import Link from "next/link";
import React from "react";
import { Tag as TagType } from "common-types";

export function Tag({ tag }: { tag: TagType }) {
    // const href = `/tag/${tag}`;
    //TODO
    const href = `/tag/${tag.id}`;
    return (
        <Link className={'text-blue-300 px-2 py-1 bg-blue-50 rounded inline-block'} href={href}>
            {tag.title}
        </Link>
    );
}
