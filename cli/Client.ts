import promptSync from 'prompt-sync';
import { CommandsHandler } from './CommandsHandler';

export interface ClientType {
    run(): Promise<void>;
};

export interface Colors {
    Red: number;
    Green: number;
    Yellow: number;
    Blue: number;
    Magenta: number;
    Cyan: number;
    White: number;
    Reset: number;
}

const colors: Colors = {
    Red: 31,
    Green: 32,
    Yellow: 33,
    Blue: 34,
    Magenta: 35,
    Cyan: 36,
    White: 37,
    Reset: 0,
};

export class Client implements ClientType {

    /**
     * I made colorsMng by myself, fucks all these useless libs
     * like chalk or Colors.js ;=)
     * @param color 
     * @param buffer 
     * @returns print of colored string
     */
    private print_colored(color: number, buffer: string): void {
        console.log(`\x1b[${color}m${buffer}\x1b[0m`);
    }

    /**
     * ATTENTION! this function does not
     * reset string color at the end of the buffer
     * @param color 
     * @param buffer 
     * @returns colored string
     */
    private colorString(color: number, buffer: string): string {
        return `\x1b[${color}m${buffer}`;
    }

    /**
     * Just the main client bc is 
     * cooler made it into a class .-.
     * @returns void of the main client processes
     */
    public async run(): Promise<void> {
        this.print_colored(colors.Yellow, String.raw`
⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢰⣿⡿⠗⠀⠠⠄⡀⠀⠀⠀⠀    Welcome to Blove!
⠀⠀⠀⠀⡜⠁⠀⠀⠀⠀⠀⠈⠑⢶⣶⡄  ---------------------
⢀⣶⣦⣸⠀⢼⣟⡇⠀⠀⢀⣀⠀⠘⡿⠃    Nsfw Search Engine
⠀⢿⣿⣿⣄⠒⠀⠠⢶⡂⢫⣿⢇⢀⠃⠀    By UsboKirishima
⠀⠈⠻⣿⣿⣿⣶⣤⣀⣀⣀⣂⡠⠊⠀⠀
⠀⠀⠀⠃⠀⠀⠉⠙⠛⠿⣿⣿⣧⠀⠀⠀
⠀⠀⠘⡀⠀⠀⠀⠀⠀⠀⠘⣿⣿⡇⠀⠀
⠀⠀⠀⣷⣄⡀⠀⠀⠀⢀⣴⡟⠿⠃⠀⠀
⠀⠀⠀⢻⣿⣿⠉⠉⢹⣿⣿⠁⠀⠀⠀⠀    ~ Enjoy!
⠀⠀⠀⠀⠉⠁⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀`);

        const prompt = promptSync();
        const commands_parser = new CommandsHandler();
        let input: string = '';

        while(input.toLowerCase() !== 'exit') {
            input = prompt('> ');

            if (input.trim()) {
                try {
                    await commands_parser.parseCommand(input);
                } catch (error: any) {
                    this.print_colored(colors.Red, 'Error processing command: ' + error.message);
                }
            }
        }

        this.print_colored(colors.Green, 'Goodbye!');
    }
}
