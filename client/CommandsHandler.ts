export interface CommandHandlerInterface {
    parseCommand(command: string): Promise<void>;
}

type Commands = {
    command_key: string,
    command_value: (command: string) => Promise<void>;
}

export class CommandsHandler implements CommandHandlerInterface {

    private async testCommand(command: string): Promise<void> {
        await console.log('Hello, Blove!');
    }

    public async parseCommand(command: string): Promise<void> {
        let commands: Commands[] = [
            {command_key: 'test', command_value: this.testCommand},
        ]

        await commands.map(async (actual_command: Commands): Promise<void> => {
            if(actual_command.command_key.startsWith(command))
                await actual_command.command_value(command);
        })
    }

}