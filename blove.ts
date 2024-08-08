/// <reference path="rest/Rest.ts" />
import { Video } from "./providers";
import PornhubProvider from "./providers/Pornhub";
import { VideoResponse } from "./providers/Pornhub";
import { Rest } from "./rest/Rest";

(async () => {
    let a = new PornhubProvider().search('pussy');

    (await a).videos.map(async (video: Video) => {
        await console.log(video.title);
    })
})()