import { ShortenUrlMapper } from "@/app/shorten-url/ShortenUrlMapper";

export class ShortenUrlRepo {
    private shortenUrlMapper: ShortenUrlMapper;

    constructor(shortenUrlMapper: ShortenUrlMapper) {
        this.shortenUrlMapper = shortenUrlMapper;
    }

    async getOriginalUrlByHash(hash: string) {
        const dto = await this.shortenUrlMapper.getOriginalUrlByHash(hash);
        if (!dto?.url) {
            // TODO, not found error
            throw new Error("Url not found")
        }
        return dto.url;
    }

    async addUrl(url: string) {
        let urlHash = "";
        await this.shortenUrlMapper.addUrl(url, urlHash)
    }
}
