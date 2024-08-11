import {
    PornhubProvider
} from '@providers/index'

import type { Video } from '@providers/index'

export interface genericVideoInfoType {
    duration: string;
    views?: number; //No required
    video_id?: string; //No required
    rating?: number; //No required
    ratings?: number; //No required
    title: string;
    url: string;
    default_thumb?: string; //No required
    thumb: string;
    publish_date: string;
    thumbs?: string[]; //No required
    tags?: string[]; //No required
    pornstars?: string[]; //No required
    categories?: string[]; //No required
    segment?: string; //No required
}

/**
 * Each provider need to returns at least this info
 * 
 * @example ```ts
 *  class Provider implements ProvidersHandler {
 *      this.videos = [...];
 *  }
 * ```
 */
abstract class ProvidersHandler {

    /**
     * Each providers 
     */
    public abstract videos(): genericVideoInfoType[]; 

    getVideos = async () => {
        return this.videos();
    }

}

export class PornHubHandler extends ProvidersHandler {
    videos() {
        let xx: genericVideoInfoType[] = [];
        return xx;
    }
}