import { CHANNEL, LOCATION, STORE_STATUS, STORE_VALUE } from '../enums.ts';

export interface IStoreSuggestion {
  country: string;
  storeStatus: STORE_STATUS;
  storeValue: STORE_VALUE | null;
  storeId: number;
  city: string;
  locationId: LOCATION;
  storeReferenceId: number;
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
