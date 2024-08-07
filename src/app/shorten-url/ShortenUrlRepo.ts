import { ShortenUrlMapper } from "@/app/shorten-url/ShortenUrlMapper";
import { RandomHashPassword } from "@/app/shorten-url/RandomHashPassword";

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
        const dto = await this.shortenUrlMapper.addUrl(url, this.makeUrlHash());
        return dto;
    }

    private makeUrlHash() {
        const urlHash = new RandomHashPassword().generate({
            withSpecialChar: true,
            length: 10
        });
        return urlHash;
    }
}
