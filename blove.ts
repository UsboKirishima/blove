/// <reference path="./rest/Rest.ts" />
import { Rest } from "./rest/Rest";
import { Client } from "./client/Client";

import { PornhubProvider } from "./providers";
import { RedtubeProvider } from "./providers";

import type { ABres, PornhubResponse } from "./providers"; //Types
import type { RedTubeResponse } from "./providers";  //Types

import type { Video } from "./providers"; //Types
import type { RTVideo } from "./providers"; //Types

// (async () => {
//     let a = new PornhubProvider().search('pussy');
//     let b = new RedtubeProvider().search('pussy');

//     (await a).videos.map(async (video: Video) => {
//         await console.log(video.title);
//     });

//     await console.log('___________________________________________________________________');;

//     (await b).videos.map(async (video: ABres) => {
//         await console.log(video.video.title);
//     });

// })()

(async () => {
    await new Client().run();
})()