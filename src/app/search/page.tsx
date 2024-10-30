import { PostsProps } from "@/app/post/page";
import CardList from "@/components/homepage/CardList";
import PostRepository from "@/repos/post/PostRepository";

const SearchPage = async ({ params }: { params: { searchVal: string } }) => {

    const postList = await PostRepository.getPosts();

    return <div>
        <h1 id="search-title">Search Results for:
            <span id="search-val" className="text-gray-800">{params.searchVal}</span>
        </h1>
        <div className="max-w-[1200px] mx-auto">
            <CardList cardListData={postList.map(p => ({
                ...p,
                thumbnailImg: p.thumbnail?.src || '',
                intro: p.description,
                className: 'hidden'
            }))} />
        </div>
        <script dangerouslySetInnerHTML={{
            __html: `
            const searchParams = new URLSearchParams(window.location.search);
            const searchVal = searchParams.get('search') || '';
            
            const postList = ${JSON.stringify(postList)}

            const filteredPostList = postList.filter(p => 
                p.title.includes(searchVal) || 
                (p.subTitle && p.subTitle.includes(searchVal)) ||
                (p.description && p.description.includes(searchVal))
            )

            window.addEventListener('load', () => {
                setTimeout(() => {
                    const searchValElement = document.getElementById('search-val')
                    searchValElement.innerHTML = searchVal
                    filteredPostList.forEach(p => {
                        document.getElementById(p.id).style.display = 'block';
                    })
                }, 100)
            })
            
            ` }} />
    </div>
}

export default SearchPage