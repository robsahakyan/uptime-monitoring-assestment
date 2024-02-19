import schedule from 'node-schedule';

import { WebsiteObserver } from './monitor';
import { Config } from './config';
import { Logger } from './logger';
import { Validator } from './validator';


const monitoringHandler = () => {
    const config = Config.load('config.json');
    const validator = new Validator(config);
    validator.validateConfigs()
    const websiteObserver = new WebsiteObserver(config);

    Logger.log(`Starting periodic monitoring of multiple websites. Expect checks every ${config.interval} seconds."`)
    schedule.scheduleJob(`*/${config.interval} * * * * *`, async function() {
        await websiteObserver.watchWebsites()
    });
}

monitoringHandler()