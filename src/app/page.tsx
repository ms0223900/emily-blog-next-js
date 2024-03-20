import HomeHomepageRepository from "@/repos/homepage/HomepageRepository";
import Banner from "@/components/homepage/Banner";
import CardList from "@/components/homepage/CardList";
import { LatestPostList } from "@/app/LatestPostList";
import { AboutMe } from "@/app/AboutMe";

async function getData() {
    const homepageData = await HomeHomepageRepository.getData();

    return homepageData;
}

export default async function Home() {
    const homepageData = await getData();

    return (
        <main
            className="flex min-h-screen flex-col items-center justify-between p-2 md:p-8 lg:p-24 bg-white text-black">
            <div className={"grid grid-cols-4 gap-10"}>
                <section className={"col-span-4 md:col-span-3"}>
                    <Banner title={"【荷蘭阿姆斯特丹】鬱金香公園-根本是天堂8太美了"}
                            intro={"兩間飯店都各有特色，其中第一間Aziza Paradise飯店比較靠近市區交通方便。而另一間Costa Palawan是靠海邊的度假村，景色超美非常適合好好的度假放鬆！"} />

                    <div className={"max-w-[1252px]"}>
                        <div className={"w-full py-10"}>
                            <h2 className={"text-left text-black font-bold text-2xl"}>Latest Post</h2>
                        </div>
                        <CardList cardListData={homepageData.posts.map(p => ({
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
