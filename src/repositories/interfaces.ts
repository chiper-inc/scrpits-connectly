import { CHANNEL, LOCATION, STORE_STATUS, STORE_VALUE } from '../enums.ts';

export enum OFFER_TYPE {
  storeReference = 'storeReferenceId',
  referencePromotion = 'referencePromotionId',
}
export interface IStoreSuggestion {
  country: string;
  storeStatus: STORE_STATUS;
  storeValue: STORE_VALUE | null;
  storeId: number;
  city: string;
  locationId: LOCATION;
  recomendationType: OFFER_TYPE;
  recomendationId: number;
  name: string;
  reference: string;
  discountFormatted: string;
  phone: string;
  ranking: number;
  from?: number | null;
  to?: number | null;
  rangeName: string;
  communicationChannel: CHANNEL;
}
