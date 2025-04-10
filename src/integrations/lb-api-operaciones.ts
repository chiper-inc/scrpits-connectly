// import { CampaignProvider } from '../services/campaign.service.ts';
import {
  LoggingProvider,
  LoggingLevel,
} from '../providers/logging.provider.ts';
import { Config } from '../config.ts';
import { StoreReferenceMap } from '../mocks/store-reference.mock.ts';
import { IShortLinkPayload, IShortLinkPayloadAndKey } from './interfaces.ts';
import * as UTILS from '../utils/index.ts';

export class LbApiOperacionesIntegration {
  private readonly url;
  private readonly apiKey; // Replace with a real token if needed
  private readonly batchSize;
  private readonly headers;
  private readonly WAITING_TIME = 750;
  private readonly logger: LoggingProvider;

  constructor() {
    this.batchSize = Config.lbApiOperaciones.batchSize;

    this.url = `${Config.lbApiOperaciones.apiUrl}`;
    this.apiKey = Config.lbApiOperaciones.apiKey; // Replace with a real token if needed
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: Config.lbApiOperaciones.apiKey
        ? Config.lbApiOperaciones.apiKey
        : `Bearer ${Config.lbApiOperaciones.apiToken}`, // Replace with a real token if needed
    };
    this.logger = new LoggingProvider({
      context: LbApiOperacionesIntegration.name,
      levels: LoggingLevel.WARN | LoggingLevel.ERROR,
    });
    this.logger.log({
      message: 'LbApiOperacionesIntegration initialized',
      data: { url: this.url, batchSize: this.batchSize },
    });
  }

  async createOneShortLink(payload: IShortLinkPayload) {
    const functionName = this.createOneShortLink.name;

    const url = `${Config.lbApiOperaciones.apiUrl}/operational/create-external-action`;

    // const url = `${Config.lbApiOperaciones.apiUrl}/operational/create-external-action${
    //   (payload?.callToAction?.storeReferenceId || 1) % 101 === 0 ? '/sss' : ''
    // }`;

    if (payload?.callToAction?.storeReferenceId) {
      payload.callToAction.referenceId = StoreReferenceMap.get(
        payload.callToAction.storeReferenceId,
      )?.referenceId as number;
    }
    const request = { url, method: 'POST', body: payload };
    return fetch(request.url, {
      method: request.method,
      headers: this.headers,
      body: JSON.stringify(request.body),
    })
      .then((response) => {
        if (response.status !== 200) {
          this.logger.error({
            message: 'Error creating short link',
            functionName,
            error: new Error(
              `Status: ${response.status} - ${response.statusText}`,
            ),
            data: { request, response },
          });
          return null;
        }
        return response.json();
      })
      .catch((error) => {
        this.logger.error({
          message: 'Error creating short link',
          functionName,
          error: new Error(error as string),
          data: { request },
        });
        return null;
      });
  }

  splitIntoBatches(
    arr: IShortLinkPayloadAndKey[],
    batchSize: number,
  ): IShortLinkPayloadAndKey[][] {
    return arr.reduce((acc, _, i) => {
      if (i % batchSize === 0) {
        acc.push(arr.slice(i, i + batchSize));
      }
      return acc;
    }, [] as IShortLinkPayloadAndKey[][]);
  }

  async createAllShortLink(
    payloadsAndKeys: IShortLinkPayloadAndKey[],
  ): Promise<{ key: string; response: unknown }[]> {
    const functionName = this.createAllShortLink.name;

    let responses: { key: string; response: unknown }[] = [];
    const batches = this.splitIntoBatches(payloadsAndKeys, this.batchSize);
    const batchCount = batches.length;
    let batchIdx = 0;
    this.logger.warn({
      message: 'Start Creating shortLinks',
      data: { batchCount, batchSize: this.batchSize },
    });
    for (const batch of batches) {
      const batchResponse: {
        key: string;
        response: unknown;
      }[] = await Promise.all(
        batch.map(async ({ key, value }) => {
          return new Promise((resolve, reject) => {
            this.createOneShortLink(value)
              .then((result) => {
                resolve({ key, response: result });
              })
              .catch((error) => {
                this.logger.error({
                  message: 'Error creating short link',
                  functionName,
                  error: new Error(error as string),
                  data: { key, value },
                });
                reject(error);
              });
          });
        }),
      );
      responses = responses.concat(batchResponse);
      this.logger.warn({
        message: `batch ${++batchIdx} of ${batchCount} for ShorLinks done. ${responses.length} responses.`,
        functionName,
        data: { batchIdx, batchCount, responses: responses.length },
      });
      // Wait for a random time between 0 and WAITING_TIME/2
      await UTILS.sleep(
        this.WAITING_TIME + Math.floor((Math.random() * this.WAITING_TIME) / 2),
      );
    }
    this.logger.warn({
      message: `End Creating ShortLinks`,
      functionName,
      data: { batchIdx, batchCount, responses: responses.length },
    });
    return responses;
  }
}
