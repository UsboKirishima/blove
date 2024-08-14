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

(async () => {
    
    await new Client().run();
})()