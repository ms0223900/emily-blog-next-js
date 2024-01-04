import HomeHomepageRepository from "@/repos/homepage/HomepageRepository";
import Link from "next/link";

async function getData() {
  const homepageData = await HomeHomepageRepository.getData();

  return homepageData;
}

export default async function Home() {
  const homepageData = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-8 lg:p-24">
      <div className="grid grid-cols-12 gap-2 flex-wrap">
        {homepageData.posts.map((post) => (
          <Link
            className="block rounded-md p-2 bg-white shadow-sm cursor-pointer hover:shadow-md col-span-full md:col-span-6 grid-cols-6"
            key={post.id}
            href={`/post/${post.id}`}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <img alt="thumbnail" src={post.thumbnail} />
              </div>
              <div className="col-span-1">
                <h2>{post.title}</h2>
                <hr />
                <p>{post.description}</p>
                <span className={"text-gray-400"}>{post.createTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
