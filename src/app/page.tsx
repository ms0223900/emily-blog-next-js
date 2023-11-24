import Link from "next/link";

async function getData() {
  const postListData = [1, 2, 3].map((id) => ({
    id: String(id),
  }));

  return {
    posts: postListData,
  };
}

export default async function Home() {
  const homepageData = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {homepageData.posts.map((post) => (
          <Link
            className="rounded-sm p-8 bg-white shadow-sm m-2 cursor-pointer hover:shadow-md"
            key={post.id}
            href={`/post/${post.id}`}
          >
            <h1>{`Post -- ${post.id}`}</h1>
          </Link>
        ))}
      </div>
    </main>
  );
}
