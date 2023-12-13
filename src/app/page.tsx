import HomeHomepageRepository from "@/repos/homepage/HomepageRepository";
import Link from "next/link";

async function getData() {
  const homepageData = await HomeHomepageRepository.getData();

  return homepageData;
}

export default async function Home() {
  const homepageData = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-12 gap-2 flex-wrap">
        {homepageData.posts.map((post) => (
          <Link
            className="block rounded-sm p-8 bg-white shadow-sm cursor-pointer hover:shadow-md col-span-4"
            key={post.id}
            href={`/post/${post.id}`}
          >
            <h2>{post.title}</h2>
            <hr />
            <p>{post.description}</p>
            <span className={"text-gray-400"}>{post.createTime}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
