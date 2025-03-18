import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { IConnectlyEntry } from './integrations/interfaces.ts';
import { ConnectlyIntegration } from './integrations/connectly.ts';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFileToJson = (filePath: string): Promise<IConnectlyEntry[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (parseErr) {
          reject(parseErr);
        }
      }
    });
  });
};

const script = async (filename: string): Promise<void> => {
  const data: IConnectlyEntry[] = await readFileToJson(
    path.join(__dirname, filename),
  );
  const connectlyIntegration = new ConnectlyIntegration();
  await connectlyIntegration.sendAllEntries(data);
};

script('../tmp/data.tmp.json').then().catch(console.error);
