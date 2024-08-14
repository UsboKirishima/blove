import { PornhubProvider, RedtubeProvider, Video } from "../providers";
import promptSync from 'prompt-sync';

export interface CommandHandlerInterface {
    parseCommand(command: string): Promise<void>;
}

type Commands = {
    command_key: string,
    command_value: (command: string) => Promise<void>;
}

const prompt = promptSync();

export class CommandsHandler implements CommandHandlerInterface {

    private async testCommand(command: string): Promise<void> {
        console.log('Hello, Blove! ' + command.split(' ').slice(1).join(' '));
    }

    private async searchCommand(command: string): Promise<void> {
        const searchTerm = command.split(' ').slice(1).join(' ');

        const [ph_data, rt_data] = await Promise.all([
            new PornhubProvider().search(searchTerm),
            new RedtubeProvider().search(searchTerm)
        ]);

        const termImg = (await import('term-img')).default;

        console.log(`\n\x1b[34mResults from Pornhub:\x1b[0m\n`);
        for (const video of ph_data.videos) {
            console.log(`\x1b[32m- ${video.title}\x1b[0m`);
            console.log(`  \x1b[36mURL: ${video.url}\x1b[0m`);

            try {
                termImg(video.thumb, { fallback: () => console.log(`Thumbnail URL: ${video.thumb}`) });
            } catch (error: any) {
                console.log(`Could not display image: ${error.message}`);
            }
        }

        console.log(`\n\x1b[35mResults from Redtube:\x1b[0m\n`);
        for (const video of rt_data.videos) {
            console.log(`\x1b[32m- ${video.video.title}\x1b[0m`);
            console.log(`  \x1b[36mURL: ${video.video.url}\x1b[0m`);

            try {
                termImg(video.video.thumb, { fallback: () => console.log(`Thumbnail URL: ${video.video.thumb}`) });
            } catch (error: any) {
                console.log(`Could not display image: ${error.message}`);
            }
        }
    }

    public async showOptions(command: string): Promise<void> {
        console.log(`
\x1b[36mAvailable Commands:\x1b[0m

\x1b[33mtest <message>\x1b[0m        - \x1b[32mPrints a welcome message.\x1b[0m
\x1b[33msearch <query>\x1b[0m       - \x1b[32mSearches videos on Pornhub and Redtube.\x1b[0m
\x1b[33mhelp\x1b[0m                 - \x1b[32mShows this help menu.\x1b[0m
\x1b[33mexit\x1b[0m                 - \x1b[32mExits the program.\x1b[0m
`);
    }

    public async parseCommand(command: string): Promise<void> {
        const commands: Commands[] = [
            { command_key: 'test', command_value: this.testCommand },
            { command_key: 'search', command_value: this.searchCommand },
            { command_key: 'help', command_value: this.showOptions }
        ];

        for (const actual_command of commands) {
            if (actual_command.command_key === command.split(' ')[0]) {
                await actual_command.command_value(command);
                return;
            }
        }

        console.log('\x1b[31mUnknown command. Type "help" for a list of commands.\x1b[0m');
    }
}
