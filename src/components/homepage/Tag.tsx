import Link from "next/link";
import React from "react";

export function Tag({ tag }: { tag: string }) {
    // const href = `/tag/${tag}`;
    //TODO
    const href = '/'
    return (
        <Link className={'text-blue-300 px-2 py-1 bg-blue-50 rounded inline-block'} href={href}>
            {tag}
        </Link>
    );
}
