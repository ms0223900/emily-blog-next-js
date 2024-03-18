import HomeHomepageRepository from "@/repos/homepage/HomepageRepository";
import Link from "next/link";
import Banner from "@/components/homepage/Banner";

async function getData() {
    const homepageData = await HomeHomepageRepository.getData();

    return homepageData;
}

export default async function Home() {
    const homepageData = await getData();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-8 lg:p-24">
            <Banner title={"【荷蘭阿姆斯特丹】鬱金香公園-根本是天堂8太美了"}
                    intro={"兩間飯店都各有特色，其中第一間Aziza Paradise飯店比較靠近市區交通方便。而另一間Costa Palawan是靠海邊的度假村，景色超美非常適合好好的度假放鬆！"}/>

            <div className="grid grid-cols-12 gap-2 flex-wrap">
                {homepageData.posts.map((post) => (
                    <Link
                        className="block rounded-md p-2 bg-white shadow-sm cursor-pointer hover:shadow-md col-span-full md:col-span-6 grid-cols-6"
                        key={post.id}
                        href={`/post/${post.id}`}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-1">
                                <img alt="thumbnail" src={post.thumbnail}/>
                            </div>
                            <div className="col-span-1">
                                <h2>{post.title}</h2>
                                <hr/>
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
