import chalk from "chalk";
import { IConfig } from "interfaces/IConfig";
import { Logger } from "./logger";

export class Validator {
    constructor(private configParams: IConfig) {}

    validateConfigs(): void {
        this.isValidUrl(this.configParams.urls);
        this.isPositiveInteger([this.configParams.threshold, this.configParams.interval]);
    }

    isValidUrl(urls: string[]): void {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        urls.map(url => {
            if (!urlPattern.test(url)) {
                Logger.error(`${url} The provided URL is not valid. Please ensure that it follows the standard URL format, including the protocol (e.g., http:// or https://) and the domain name.`, chalk.red);
            }
        })
    }

    isPositiveInteger(numbers: number[]): void {
        numbers.map((num) => {
            if (!(Number.isInteger(num) && num > 0)) {
                Logger.error(`Your configurations do not correspond to the expected values.`, chalk.red);
            }
        })
    }

}