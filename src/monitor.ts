import { IConfig } from "interfaces/IConfig";
import axios, { AxiosResponse } from 'axios'
import { Logger } from "./logger";
import chalk, { Chalk } from "chalk";

export class WebsiteObserver {
    private consecutiveFailures: Record<string, number> = {};

    constructor (private configParams: IConfig) {}
    
    async watchWebsites(): Promise<void> {
        Logger.log('Checking status of websites...')
        await Promise.all(this.configParams.urls.map((url) => this.monitorSingleUrl(url)))
    }

    private async monitorSingleUrl(url: string): Promise<void> {
        let messages: string[] = [`Website: ${url}`];
        let color: Chalk | undefined;
        const startTime = Date.now();

        try {
            const { status, statusText }: AxiosResponse = await axios.head(url);
            const endTime = Date.now();
            const uptime = endTime - startTime;
            if (status >= 200 && status < 300) {
                color = chalk.green;
            } else {
                color = chalk.blue;
                this.incrementFailureCount(url);
            }
            messages.push(`Status: ${status} ${statusText}, Response Time: ${uptime}ms`);

        } catch (err: any) {
            if (err.response) {
                const { status, statusText} = err.response;
                messages.push(`Status: ${status} ${statusText}`)
            } else {
                messages.push(`An error occurred while trying to access the website.`)
            }
            color = chalk.red;
            this.incrementFailureCount(url);
            
        } finally {
            if (this.consecutiveFailures[url] >= this.configParams.threshold) {
                messages.push(`ALERT: ${url} is unreachable. Consecutive failures threshold has been exceeded.`);
                color = chalk.yellowBright
            }
            Logger.log(messages, color);
        }
    }

    private incrementFailureCount(url: string): void {
        this.consecutiveFailures[url] = (this.consecutiveFailures[url] || 0) + 1;
    }
}