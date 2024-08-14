export interface CommandHandlerInterface {
    parseCommand(command: string): Promise<void>;
}

type Commands = {
    command_key: string,
    command_value: (command: string) => Promise<void>;
}

export class CommandsHandler implements CommandHandlerInterface {

    private async testCommand(command: string): Promise<void> {
        await console.log('Hello, Blove! ' + command.split(' ').slice(1).join(' '));
    }

    public async parseCommand(command: string): Promise<void> {
        let commands: Commands[] = [
            {command_key: 'test', command_value: this.testCommand},
        ]

        await commands.map(async (actual_command: Commands): Promise<void> => {
            if(actual_command.command_key === command.split(' ')[0])
                await actual_command.command_value(command);
        })
    }

}