

// import data from './empty.json' assert { type: "json" };
// import data from '../xx.json' assert { type: "json" };
import { Config } from '../config.js';
import { StoreReferenceMap } from '../store-reference.mock.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export class LbApiOperacionesIntegration {
  url;
  apiKey;  // Replace with a real token if needed
  BATCH_SIZE;
  headers;
  
  constructor(batchSize = 5) {
    this.BATCH_SIZE = batchSize;
  
    this.url = `${Config.lbApiOperaciones.apiUrl}`;
    this.apiKey = Config.lbApiOperaciones.apiKey;  // Replace with a real token if needed
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': Config.lbApiOperaciones.apiKey
        ? Config.lbApiOperaciones.apiKey
        : `Bearer ${Config.lbApiOperaciones.apiToken}`, // Replace with a real token if needed
      };

    // console.log(this);
  }

  async createOneShortLink(payload) {
    const url = `${Config.lbApiOperaciones.apiUrl}/operational/create-external-action`;
    if (payload?.callToAction?.storeReferenceId) {
      payload.callToAction.referenceId = StoreReferenceMap.get(payload.callToAction.storeReferenceId);
    }
    // console.log({ headers: this.headers, payload });
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.status !== 200) {
        console.error('ERROR:', response.status, ':', response.statusText);
        return null;
        throw new Error(`Error creating shortLink: ${response.status}: ${response.statusText}`);
      }
      return response.json()
    }).catch((error) => {
      console.error('ERROR:', error);
      throw null;
    })
  }
  
  splitIntoBatches(arr, batchSize) {
    return arr.reduce((acc, _, i) => {
        if (i % batchSize === 0) {
          acc.push(arr.slice(i, i + batchSize));
        }
        return acc;
    }, []);
  }

  async createAllShortLink(payloadsAndKeys) {
    // console.log({ payloadsAndKeys });
    let responses = [];
    const batches = this.splitIntoBatches(
      payloadsAndKeys,
      this.BATCH_SIZE,
    );
    const batchCount = batches.length;
    let batchIdx = 0;
    for (const batch of batches) {
      const batchResponse = await Promise.all(batch.map(async (
        { key, value }
      )=> {
        return new Promise((resolve, reject) => {
          this.createOneShortLink(value)
          .then(result => {
            resolve({ key, response: result });
          })
          .catch(error => {
            console.error('ERROR:', error, value, key);
            reject(error);
          });
        })
      }));
      // console.log(JSON.stringify(batchResponse, null, 2));
      responses = responses.concat(batchResponse);
      console.error(`batch ${++batchIdx} of ${batchCount} done. ${responses.length} responses.`);
      await sleep(750 + Math.floor(Math.random() * 500));
    }
    // console.log('=======\n', JSON.stringify(responses, null, 2), "\n=======");
    return responses;
  }
}
