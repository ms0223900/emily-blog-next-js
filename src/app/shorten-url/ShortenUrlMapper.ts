export interface ShortenUrlMapper {
    getOriginalUrl(id: string): string | null;
}

export class ShortenUrlMapperImpl implements ShortenUrlMapper {
    getOriginalUrl(id: string): string | null {
        return null;
    }
}
