import Link from "next/link";
import React, { memo } from "react";

const Posts = () => {
  return (
    <div className="p-10">
      <h1 className={`text-xl`}>All Posts Here :)</h1>
      <div className="p-4 shadow-md rounded-md">
        <Link href={"/post/1"}>Post 1</Link>
        <Link href={"/post/2"}>Post 2</Link>
        <Link href={"/post/3"}>Post 3</Link>
        <Link href={"/post/4"}>Post 4</Link>
      </div>
    </div>
  );
};

export default memo(Posts);
