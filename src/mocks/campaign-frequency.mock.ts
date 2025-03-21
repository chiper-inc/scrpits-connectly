import { IFrequencyParameter } from './interfaces.ts';
import { LOCATION, STORE_STATUS } from '../enums.ts';

export const frequencyByLocationAndStatusAndRange: IFrequencyParameter[] = [
  { locationId: LOCATION.BAQ, storeStatus: STORE_STATUS.Churn, from: 90, to: 119, frequency: 3 },
  { locationId: LOCATION.BAQ, storeStatus: STORE_STATUS.Hibernating, frequency: 3 },
  { locationId: LOCATION.BAQ, storeStatus: STORE_STATUS.Lead, frequency: 7 },
  { locationId: LOCATION.BAQ, storeStatus: STORE_STATUS.New, frequency: 3 },
  { locationId: LOCATION.BAQ, storeStatus: STORE_STATUS.Resurrected, frequency: 3 },
  { locationId: LOCATION.BAQ, storeStatus: STORE_STATUS.Retained, frequency: 3 },

  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Churn, from: 90, to: 119, frequency: 2 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Churn, from: 120, to: 149, frequency: 2 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Churn, from: 150, to: 179, frequency: 2 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Churn, from: 180, to: 209, frequency: 3 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Churn, from: 210, to: 359, frequency: 3 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Hibernating, frequency: 2 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Lead, frequency: 3 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.New, frequency: 2 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Resurrected, frequency: 2 },
  { locationId: LOCATION.BOG, storeStatus: STORE_STATUS.Retained, frequency: 2 },

  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Churn, from: 90, to: 119, frequency: 2 },
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Churn, from: 120, to: 149, frequency: 2 },
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Churn, from: 150, to: 179, frequency: 2 },
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Churn, from: 180, to: 209, frequency: 3 },
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Churn, from: 210, to: 359, frequency: 3},
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Hibernating, frequency: 2 },
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Lead, frequency: 2 },
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.New, frequency: 2 },
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Resurrected, frequency: 2 },
  { locationId: LOCATION.CLO, storeStatus: STORE_STATUS.Retained, frequency: 2 },

  { locationId: LOCATION.CMX,storeStatus: STORE_STATUS.Hibernating, frequency: 3 },
  { locationId: LOCATION.CMX, storeStatus: STORE_STATUS.Lead, frequency: 0 },
  { locationId: LOCATION.CMX, storeStatus: STORE_STATUS.New, frequency: 7 },
  { locationId: LOCATION.CMX, storeStatus: STORE_STATUS.Resurrected, frequency: 7 },
  { locationId: LOCATION.CMX, storeStatus: STORE_STATUS.Retained, frequency: 7 },

  { locationId: LOCATION.MDE, storeStatus: STORE_STATUS.Churn, from: 90, to: 119, frequency: 3},
  { locationId: LOCATION.MDE, storeStatus: STORE_STATUS.Hibernating, frequency: 3},
  { locationId: LOCATION.MDE, storeStatus: STORE_STATUS.Lead, frequency: 7 },
  { locationId: LOCATION.MDE, storeStatus: STORE_STATUS.New, frequency: 3 },
  { locationId: LOCATION.MDE, storeStatus: STORE_STATUS.Resurrected, frequency: 3 },
  { locationId: LOCATION.MDE, storeStatus: STORE_STATUS.Retained, frequency: 3 },

  { locationId: LOCATION.VLN, storeStatus: STORE_STATUS.Churn, from: 90, to: 119, frequency: 2 },
  { locationId: LOCATION.VLN, storeStatus: STORE_STATUS.Churn, from: 120, to: 149, frequency: 2 },
  { locationId: LOCATION.VLN, storeStatus: STORE_STATUS.Retained, frequency: 2 },
  { locationId: LOCATION.VLN, storeStatus: STORE_STATUS.Resurrected, frequency: 2 },
  { locationId: LOCATION.VLN, storeStatus: STORE_STATUS.New, frequency: 2 },
  { locationId: LOCATION.VLN, storeStatus: STORE_STATUS.Lead, frequency: 2 },
  { locationId: LOCATION.VLN, storeStatus: STORE_STATUS.Hibernating, frequency: 2 },
];