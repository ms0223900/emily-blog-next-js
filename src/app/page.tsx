import HomeHomepageRepository from "@/repos/homepage/HomepageRepository";
import Link from "next/link";

async function getData() {
  // TODO, fetch api error handling?

  // below just for sample api calling
  // const res = await TodoRepository.getAll();
  // const postListData = res.map((todo) => ({
  //   id: todo.id.toString(),
  // }));

  // console.log("res", res);
  const homepageData = await HomeHomepageRepository.getData();

  // const postListData = [1, 2, 3].map((id) => ({
  //   id: String(id),
  // }));

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
          </Link>
        ))}
      </div>
    </main>
  );
}
