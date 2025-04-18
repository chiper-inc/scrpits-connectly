import * as UTILS from '../utils/index.ts';
import { IConnectlyEntry } from '../integrations/interfaces.ts';
import { ConnectlyIntegration } from '../integrations/connectly.ts';
import { Logger } from 'logging-chiper';

const script = async (filename: string): Promise<void> => {
  const data = (await UTILS.readFileToJson(filename)) as IConnectlyEntry[];
  const connectlyIntegration = new ConnectlyIntegration();
  await connectlyIntegration.sendAllEntries(data.flat());
};

(async () => {
  Logger.init({
    projectId: 'Campaign Engine',
    service: 'Script: Send Connectly',
  });
  Logger.getInstance().log({
    stt: 'scripting',
    message: 'Send Connectly Script started',
  });
  const args = process.argv;
  if (args.length < 3) {
    throw new Error('Please provide a filename as an argument.');
  }
  await script(args[2]);
})()
  .then(() => {
    Logger.getInstance().log({
      stt: 'scripting',
      message: 'Send Connectly Script finished',
    });
    process.exit(0);
  })
  .catch((err) => {
    Logger.getInstance().error({
      stt: 'scripting',
      message: err.message,
      error: err,
    });
    process.exit(1);
  });
