import fs from 'fs'

import { IConfig } from 'interfaces/IConfig';

export class Config {
    static load(filePath: string): IConfig {
        const configContent = fs.readFileSync(filePath, 'utf8');
        const config = JSON.parse(configContent);

        return {
            urls: config.urls || [],
            interval: config.interval || 300,
            threshold: config.threshold || 5,
        };
    }
}