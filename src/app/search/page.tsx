import { PostsProps } from "@/app/post/page";
import CardList from "@/components/homepage/CardList";
import PostRepository from "@/repos/post/PostRepository";

const SearchPage = async ({ params }: { params: { searchVal: string } }) => {

    const postList = await PostRepository.getPosts();

    const cardListData = JSON.parse(JSON.stringify(postList.map(p => ({
        ...p,
        thumbnailImg: p.thumbnail?.src || '',
        intro: p.description
    }))));

    return <div>
        <h1 id="search-title" className="text-2xl font-bold text-center py-4">Search Results for:
            <span id="search-val" className="text-gray-800">{params.searchVal}</span>
        </h1>
        <div className="max-w-[1200px] mx-auto">
            <div id="loading" className="text-center py-4">Loading...</div>
            <div id="card-list--wrapper" className="hidden">
                <CardList cardListData={cardListData} />
            </div>
        </div>
        <script dangerouslySetInnerHTML={{
            __html: `
            const searchParams = new URLSearchParams(window.location.search);
            const searchVal = searchParams.get('search') || '';
            
            const postList = ${JSON.stringify(postList.map(p => ({
                id: p.id.toString(),
                title: p.title,
                subTitle: p.subTitle,
                description: p.description
            })))}

            const filteredPostList = postList.filter(p => 
                p.title.includes(searchVal) || 
                (p.subTitle && p.subTitle.includes(searchVal)) ||
                (p.description && p.description.includes(searchVal))
            )

            window.addEventListener('load', () => {
                
                setTimeout(() => {
                    const cardListWrapper = document.getElementById('card-list--wrapper');
                    const loadingElement = document.getElementById('loading');
                    const searchValElement = document.getElementById('search-val');
                    searchValElement.innerHTML = searchVal;
                    
                    cardListWrapper.style.display = 'block';
                    loadingElement.style.display = 'none';

                    postList.forEach(p => {
                        document.getElementById(p.id).style.display = 'none';
                    });
                    
                    filteredPostList.forEach(p => {
                        document.getElementById(p.id).style.display = 'block';
                    });
                }, 100);
            });
            
            ` }} />
    </div>
}

export default SearchPage