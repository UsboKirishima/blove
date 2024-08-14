import express, { Request, Response } from 'express';
import { PornhubProvider, RedtubeProvider, RTVideo, Video } from '../providers';
import path from 'path';

export const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

const adaptRedtubeVideo = (video: RTVideo): Video => {
    return {
        duration: video.duration,
        views: parseInt(video.views), // Convert in number
        video_id: video.video_id,
        rating: parseFloat(video.rating),
        ratings: parseInt(video.ratings, 10),
        title: video.title,
        url: video.url,
        default_thumb: video.default_thumb,
        thumb: video.thumb,
        publish_date: video.publish_date.toString(),
        thumbs: video.thumbs.map(thumb => ({
            size: thumb.size,
            width: thumb.width.toString(),
            height: thumb.height.toString(),
            src: thumb.src,
        })),
        tags: [],
        pornstars: [],
        categories: [], 
        segment: "", 
    };
};

app.get('/search', async (req: Request, res: Response) => {
    const query = req.query.q as string;
    const provider = req.query.provider as string;

    if (!query) {
        return res.redirect('/');
    }

    try {
        if (provider === 'pornhub') {
            const phProvider = new PornhubProvider();
            const { videos } = await phProvider.search(query);
            res.render('results', {
                query,
                videos,
                provider: 'pornhub'
            });
        } else if (provider === 'redtube') {
            const rtProvider = new RedtubeProvider();
            const { videos } = await rtProvider.search(query);
            const adaptedVideos = videos.map(video => adaptRedtubeVideo(video.video));
            res.render('results', {
                query,
                videos: adaptedVideos,
                provider: 'redtube'
            });
        } else {
            res.status(400).send('Invalid provider specified.');
        }
    } catch (error) {
        console.error("Error during video search:", error);
        res.status(500).send('An error occurred while searching for videos.');
    }
});