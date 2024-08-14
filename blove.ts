/// <reference path="./rest/Rest.ts" />
import { Rest } from "./rest/Rest";
import { Client } from "./cli/Client";

import { app } from './client/app';

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

const PORT: number = 5423;

const coloredText = (text: string, colorCode: number) => `\x1b[${colorCode}m${text}\x1b[0m`;

const welcomeMessage = String.raw`
${coloredText('⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀', 34)}
${coloredText('⠀⠀⠀⠀⢰⣿⡿⠗⠀⠠⠄⡀⠀⠀⠀⠀', 33)}${coloredText('    Welcome to Blove!', 32)}
${coloredText('⠀⠀⠀⠀⡜⠁⠀⠀⠀⠀⠀⠈⠑⢶⣶⡄', 33)}${coloredText('  ---------------------', 37)}
${coloredText('⢀⣶⣦⣸⠀⢼⣟⡇⠀⠀⢀⣀⠀⠘⡿⠃', 33)}${coloredText('    Nsfw Search Engine', 35)}
${coloredText('⠀⢿⣿⣿⣄⠒⠀⠠⢶⡂⢫⣿⢇⢀⠃⠀', 33)}${coloredText('    By UsboKirishima', 36)}
${coloredText('⠀⠈⠻⣿⣿⣿⣶⣤⣀⣀⣀⣂⡠⠊', 31)}
${coloredText('⠀⠀⠀⠃⠀⠀⠉⠙⠛⠿⣿⣿⣧⠀⠀⠀', 31)}${coloredText('    Listing on:', 32)}
${coloredText('⠀⠀⠘⡀⠀⠀⠀⠀⠀⠀⠘⣿⣿⡇⠀⠀', 33)}${coloredText('    http://localhost:', 34)}${coloredText(PORT.toString(), 32)}
${coloredText('⠀⠀⠀⣷⣄⡀⠀⠀⠀⢀⣴⡟⠿⠃', 33)}
${coloredText('⠀⠀⠀⢻⣿⣿⠉⠉⢹⣿⣿⠁⠀⠀⠀', 33)}${coloredText('    ~ Enjoy!', 32)}
${coloredText('⠀⠀⠀⠀⠉⠁⠀⠀⠀⠉⠁', 34)}
`;

(async () => {
    app.listen(PORT, () => {
        console.log(welcomeMessage);

        //await new Client().run();
    })
})()