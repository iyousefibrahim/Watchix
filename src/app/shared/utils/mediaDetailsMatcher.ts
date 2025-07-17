import { UrlMatchResult, UrlSegment } from "@angular/router";

const VALID_MEDIA_TYPES = ['movie', 'tv'];

export function mediaDetailsMatcher(segments: UrlSegment[]): UrlMatchResult | null {
    const [typeSegment, idSegment] = segments;

    const isValidType = VALID_MEDIA_TYPES.includes(typeSegment?.path);
    const isValidId = /^\d+$/.test(idSegment?.path);

    if (segments.length === 2 && isValidType && isValidId) {
        return {
            consumed: segments,
            posParams: {
                mediaType: typeSegment,
                mediaId: idSegment,
            },
        };
    }

    return null;
}