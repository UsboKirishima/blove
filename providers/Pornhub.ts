import { RestManagerConfig } from "../typings/RestMaganerTypes";
import { Rest } from "../rest/Rest";
import { pornhubDomains } from "../costants/domains";
import { AxiosResponse } from "axios";

interface PornhubRes {
    search(q: string): Promise<object>;
}

export interface Thumbnail {
    size: string;
    width: string;
    height: string;
    src: string;
}

export interface Tag {
    tag_name: string;
}

export interface Category {
    category: string;
}

export interface Pornstar {
    pornstar_name: string;
}

export interface Video {
    duration: string;
    views: number;
    video_id: string;
    rating: number;
    ratings: number;
    title: string;
    url: string;
    default_thumb: string;
    thumb: string;
    publish_date: string;
    thumbs: Thumbnail[];
    tags: Tag[];
    pornstars: Pornstar[];
    categories: Category[];
    segment: string;
}

export interface VideoResponse {
    videos: Video[];
}


/**
 * Pornhub Provider
 * @example ```ts
 * new PornhubProvider();
    ```
 */


const rest = new Rest.RestManager({
    baseURL: pornhubDomains.baseURL,
});

export default class PornhubProvider implements PornhubRes {

    /**
     * PornhubProvider - search();
     * @param q string
     * @returns data
     * @example ```ts
     * new PornhubProvider().search(q: string);
     * ```
     * @public
     */
    public async search(q: string): Promise<VideoResponse> {

        const response = await rest.get<VideoResponse>(pornhubDomains.searchURL + q);
        const data: VideoResponse = await response.data;

        return data;
    }
}