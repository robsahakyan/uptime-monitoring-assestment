import chalk, { Chalk } from 'chalk';

export class Logger {
  static log(messages: string | string[], color: Chalk = chalk.blue) {
    const timestamp = new Date().toISOString();

    if (Array.isArray(messages)) {
      return messages.map((message: string) => {
          console.info(color(`[${timestamp}] ${message}`));
      }) 
    }
    return console.info(color(`[${timestamp}] ${messages}`));
  }

  static error(message: string, color: Chalk = chalk.red) {
    console.error(color(`Error: ${message}`));
    process.exit(1);
  }
}