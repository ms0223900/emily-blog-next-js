import Link from "next/link";
import React from "react";

export function Tag({tag}: { tag: string }) {
    return (
        <Link className={'text-blue-300 p-2 bg-blue-50 rounded inline-block'} href={`/tag/${tag}`}>
            {tag}
        </Link>
    );
}
