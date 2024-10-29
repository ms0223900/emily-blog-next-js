import HomeHomepageRepository from "@/repos/homepage/HomepageRepository";
import Banner from "@/components/homepage/Banner";
import CardList from "@/components/homepage/CardList";
import { LatestPostList } from "@/app/LatestPostList";
import { AboutMe } from "@/app/AboutMe";
import Head from "next/head";
import Link from "next/link";
import { cn } from "@/styles/helpers";
import React from "react";
import { ID, Tag } from "common-types";

async function getData() {
    const homepageData = await HomeHomepageRepository.getData();

    return homepageData;
}

interface TagAmount {
    tagId: ID
    tagTitle: string
    amount: number
}

interface CategoriesProps {
    tagsAmount: TagAmount[]
}

const Categories: React.FC<CategoriesProps> = ({
    tagsAmount
}) => {
    return (
        <div>
            <h2 className={
                cn("bg-primary pt-1 text-xl font-bold text-white",
                    "inline-block"
                )
            }>
                Categories
            </h2>
            <div className={'pt-[40px]'}>
                {tagsAmount.map(tagAmount => (
                    <Link
                        key={tagAmount.tagId}
                        href={`/tag/${tagAmount.tagId}`}
                        className={
                            cn('flex justify-between', 'pb-2')
                        }
                    >
                        <p>
                            {tagAmount.tagTitle}
                        </p>
                        <p>
                            {tagAmount.amount}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

function getTagsAmount(postTags: Tag[][]): Record<ID, TagAmount> {
    if (typeof postTags === 'string') {
        return ({});
    }
    let res = {} as Record<ID, TagAmount>;
    for (let i = 0; i < postTags.length; i++) {
        const singlePostTags = postTags[i];
        for (let j = 0; j < singlePostTags.length; j++) {
            const tag = singlePostTags[j];
            if (!tag) continue
            res[tag.id] = {
                tagId: tag.id,
                tagTitle: tag.title,
                amount: (res[tag.id]?.amount || 0) + 1
            }
        }
    }
    return res;
}

export default async function Home() {
    const homepageData = await getData();
    const postTags = homepageData.posts.map(post => post.tagList);

    const tagsAmount = getTagsAmount(postTags);

    const firstPost = homepageData.posts[0];
    let tagsAmountList = (() => {
        let res: TagAmount[] = []
        for (let tagsAmountKey in tagsAmount) {
            const tagAmount = tagsAmount[tagsAmountKey];
            res.push(tagAmount)
        }
        return res;
    })();

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
                        thumbnail={firstPost?.thumbnail?.src || ''}
                        id={firstPost?.id}
                        tagList={[...(JSON.parse(JSON.stringify(firstPost?.tagList || [])))]} />

                    <div className={"max-w-[1252px]"}>
                        <div className={"flex justify-between w-full py-10"}>
                            <h2 className={"text-left text-black font-bold text-2xl"}>Latest Posts</h2>
                            <Link className={"text-blue-400 font-bold"} href={`/post`}>
                                {`more >>`}
                            </Link>
                        </div>
                        <CardList cardListData={homepageData.posts.slice(1).map(p => ({
                            ...p,
                            thumbnailImg: p.thumbnail?.src || '',
                            tag: p.tagList[0], // TODO: multiple tags
                            intro: p.description
                        }))} />
                    </div>
                </section>
                <section className={
                    cn('col-span-4 md:col-span-1',
                        'flex flex-col gap-20'
                    )
                }>
                    <AboutMe />
                    <Categories tagsAmount={tagsAmountList} />
                    <LatestPostList />
                </section>
            </div>

            <footer>

            </footer>
        </main>
    );
}
