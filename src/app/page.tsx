import Link from "next/link";

async function getData() {
  // TODO, fetch api error handling?

  // below just for sample api calling
  // const res = await TodoRepository.getAll();
  // const postListData = res.map((todo) => ({
  //   id: todo.id.toString(),
  // }));

  // console.log("res", res);

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
            className="inline-block rounded-sm p-8 bg-white shadow-sm m-2 cursor-pointer hover:shadow-md"
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
