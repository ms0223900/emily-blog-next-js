import HomeHomepageRepository from "@/repos/homepage/HomepageRepository";
import Banner from "@/components/homepage/Banner";
import CardList from "@/components/homepage/CardList";
import { LatestPostList } from "@/app/LatestPostList";
import { AboutMe } from "@/app/AboutMe";
import Head from "next/head";
import Link from "next/link";

async function getData() {
    const homepageData = await HomeHomepageRepository.getData();

    return homepageData;
}

export default async function Home() {
    const homepageData = await getData();

    const firstPost = homepageData.posts[0];
    return (
        <main
            className="flex min-h-screen flex-col items-center justify-between p-2 md:p-8 lg:p-24 bg-white text-black">
            <Head>
                <title>Emily's Blog</title>
            </Head>
            <div className={"grid grid-cols-4 gap-10"}>
                <section className={"col-span-4 md:col-span-3"}>
                    <Banner title={firstPost?.title}
                            intro={firstPost?.description}
                            thumbnail={firstPost?.thumbnail}
                            id={firstPost?.id} />

                    <div className={"max-w-[1252px]"}>
                        <div className={"flex justify-between w-full py-10"}>
                            <h2 className={"text-left text-black font-bold text-2xl"}>Latest Posts</h2>
                            <Link className={"text-blue-400 font-bold"} href={`/posts`}>
                                {`more >>`}
                            </Link>
                        </div>
                        <CardList cardListData={homepageData.posts.slice(1).map(p => ({
                            ...p,
                            thumbnailImg: p.thumbnail,
                            tag: p.tags,
                            intro: p.content
                        }))} />
                    </div>
                </section>
                <section className={'col-span-4 md:col-span-1'}>
                    <AboutMe />
                    <LatestPostList />
                </section>
            </div>

            <footer>

            </footer>
        </main>
    );
}
