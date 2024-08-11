import { Provider } from "constructors/Provider";
import { Rest } from "../rest/Rest";

export interface Thumb {
    size: string;
    width: number;
    height: number;
    src: string;
}

export interface RTVideo {
    duration: string;
    views: string;
    video_id: string;
    rating: string;
    ratings: string;
    title: string;
    url: string;
    embed_url: string;
    default_thumb: string;
    thumb: string;
    publish_date: boolean | string; // Può essere booleano o una stringa nel caso fosse presente
    thumbs: Thumb[];
}

export interface ABres {
    video: RTVideo;
}

export interface RedTubeResponse {
    videos: ABres[];
}

const rest = new Rest.RestManager({
    baseURL: 'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json',
});

export class RedtubeProvider implements Provider {


    public async search(q: string, tags?: string, thumbsize?: string | 'all'): Promise<RedTubeResponse> {
        const response = await rest.get<RedTubeResponse>(
            `&search=${q}&tags[]=${tags || "_"}&thumbsize=${thumbsize || 'all'}`
        );
        const data: RedTubeResponse = await response.data;
        return data;
    }
}