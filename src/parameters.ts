import { LOCATION, STORE_STATUS } from './enums.ts';
import { TypeCampaignByStatus, TypeFrequencyByStatus } from './types.ts';

export const frequencyByStatus: TypeFrequencyByStatus = {
  [STORE_STATUS.Churn]: {
    [LOCATION._default]: 0,
    [LOCATION.BAQ]: 0, // 4,
    [LOCATION.BOG]: 0, // 2,
    [LOCATION.CLO]: 0, // 3,
    [LOCATION.CMX]: 0, // 4,
    [LOCATION.MDE]: 0, // 4,
    [LOCATION.VLN]: 0, // 4,
  },
  [STORE_STATUS.Hibernating]: {
    [LOCATION._default]: 0,
    [LOCATION.BAQ]: 2,
    [LOCATION.BOG]: 2,
    [LOCATION.CLO]: 2,
    [LOCATION.CMX]: 4,
    [LOCATION.MDE]: 2,
    [LOCATION.VLN]: 2,
  },
  [STORE_STATUS.Lead]: {
    [LOCATION._default]: 0,
    [LOCATION.BAQ]: 2,
    [LOCATION.BOG]: 2,
    [LOCATION.CLO]: 2,
    [LOCATION.CMX]: 8,
    [LOCATION.MDE]: 2,
    [LOCATION.VLN]: 2,
  },
  [STORE_STATUS.New]: {
    [LOCATION._default]: 0,
    [LOCATION.BAQ]: 2,
    [LOCATION.BOG]: 2,
    [LOCATION.CLO]: 2,
    [LOCATION.CMX]: 8,
    [LOCATION.MDE]: 2,
    [LOCATION.VLN]: 2,
  },
  [STORE_STATUS.Resurrected]: {
    [LOCATION._default]: 0,
    [LOCATION.BAQ]: 2,
    [LOCATION.BOG]: 2,
    [LOCATION.CLO]: 2,
    [LOCATION.CMX]: 4,
    [LOCATION.MDE]: 2,
    [LOCATION.VLN]: 2,
  },
  [STORE_STATUS.Retained]: {
    [LOCATION._default]: 0,
    [LOCATION.BAQ]: 2,
    [LOCATION.BOG]: 2,
    [LOCATION.CLO]: 2,
    [LOCATION.CMX]: 4,
    [LOCATION.MDE]: 2,
    [LOCATION.VLN]: 2,
  },
  [STORE_STATUS._default]: 2,
};

const generateParams = (
  params: string[], 
  length: number
) => 
  Array.from({ length }, (_, i) => params.map(p => `${p}_${i + 1}`)).flat();

const NAME = ['name'];
const DEFAULT = NAME.concat(generateParams(['sku', 'dsct'], 2));
const SKU_DSCT = ['sku', 'dsct'];
const SKU_DSCT_IMG = ['sku', 'dsct', 'img'];

export const TESTING_CLIENTS = ['+573153108376'];

export const campaignsBySatatus: TypeCampaignByStatus = {
  [STORE_STATUS.Churn]: {
    names: [],
    variables: {
      _default: DEFAULT,
      API_Churn_1_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Churn_2_es_v0: NAME.concat(generateParams(SKU_DSCT, 2)),
      API_Churn_3_es_v0: NAME.concat(generateParams(SKU_DSCT, 3)),
      API_Churn_4_es_v0: NAME.concat(generateParams(SKU_DSCT, 4)),
      API_Churn_5_es_v0: NAME.concat(generateParams(SKU_DSCT, 5)),
      API_Churn_6_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Churn_7_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 2)),
      API_Churn_8_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 3)),
      API_Churn_9_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 4)),
    }
  },
  [STORE_STATUS.Lead]: {
    names: [],
    variables: {
      _default: DEFAULT,
      API_Lead_1_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Lead_2_es_v0: NAME.concat(generateParams(SKU_DSCT, 2)),
      API_Lead_3_es_v0: NAME.concat(generateParams(SKU_DSCT, 3)),
      API_Lead_4_es_v0: NAME.concat(generateParams(SKU_DSCT, 4)),
      API_Lead_5_es_v0: NAME.concat(generateParams(SKU_DSCT, 5)),
      API_Lead_6_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Lead_7_es_v1: NAME.concat(generateParams(SKU_DSCT_IMG, 2)),
      API_Lead_8_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 3)),
      API_Lead_9_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 4)),
    }
  },
  [STORE_STATUS.New]: {
    names: [],
    variables: {
      _default: DEFAULT,
      API_New_1_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_New_2_es_v0: NAME.concat(generateParams(SKU_DSCT, 2)),
      API_New_3_es_v0: NAME.concat(generateParams(SKU_DSCT, 3)),
      API_New_4_es_v0: NAME.concat(generateParams(SKU_DSCT, 4)),
      API_New_5_es_v0: NAME.concat(generateParams(SKU_DSCT, 5)),
      API_New_6_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_New_7_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 2)),
      API_New_8_es_v1: NAME.concat(generateParams(SKU_DSCT_IMG, 3)),
      API_New_9_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 4)),
    },
  },
  [STORE_STATUS.Hibernating]: {
    names: [],
    variables: {
      _default: DEFAULT,
      API_Hibernating_1_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Hibernating_2_es_v0: NAME.concat(generateParams(SKU_DSCT, 2)),
      API_Hibernating_3_es_v0: NAME.concat(generateParams(SKU_DSCT, 3)),
      API_Hibernating_4_es_v0: NAME.concat(generateParams(SKU_DSCT, 4)),
      API_Hibernating_5_es_v0: NAME.concat(generateParams(SKU_DSCT, 5)),
      API_Hibernating_6_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Hibernating_7_es_v1: NAME.concat(generateParams(SKU_DSCT_IMG, 2)),
      API_Hibernating_8_es_v2: NAME.concat(generateParams(SKU_DSCT_IMG, 3)),
      API_Hibernating_9_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 4)),
    }

  },
  [STORE_STATUS.Retained]: {
    names: [],
    variables: {
      _default: DEFAULT,
      API_Retained_1_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Retained_2_es_v0: NAME.concat(generateParams(SKU_DSCT, 2)),
      API_Retained_3_es_v0: NAME.concat(generateParams(SKU_DSCT, 3)),
      API_Retained_4_es_v0: NAME.concat(generateParams(SKU_DSCT, 4)),
      API_Retained_5_es_v0: NAME.concat(generateParams(SKU_DSCT, 5)),
      API_Retained_6_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Retained_7_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 2)),
      API_Retained_8_es_v1: NAME.concat(generateParams(SKU_DSCT_IMG, 3)),
      API_Retained_9_es_v1: NAME.concat(generateParams(SKU_DSCT_IMG, 4)),
    }

  },
  [STORE_STATUS.Resurrected]: {
    names: [],
    variables: {
      _default: DEFAULT,
      API_Resurrected_1_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Resurrected_2_es_v0: NAME.concat(generateParams(SKU_DSCT, 2)),
      API_Resurrected_3_es_v0: NAME.concat(generateParams(SKU_DSCT, 3)),
      API_Resurrected_4_es_v0: NAME.concat(generateParams(SKU_DSCT, 4)),
      API_Resurrected_5_es_v0: NAME.concat(generateParams(SKU_DSCT, 5)),
      API_Resurrected_6_es_v0: NAME.concat(generateParams(SKU_DSCT, 1)),
      API_Resurrected_7_es_v1: NAME.concat(generateParams(SKU_DSCT_IMG, 2)),
      API_Resurrected_8_es_v1: NAME.concat(generateParams(SKU_DSCT_IMG, 3)),
      API_Resurrected_9_es_v0: NAME.concat(generateParams(SKU_DSCT_IMG, 4)),
    }
  },
  [STORE_STATUS._default]: {
    names: [],
    variables: {
      _default: NAME,
    }
  }
}

for (const campaignStatus in campaignsBySatatus) {
  const status = campaignStatus as unknown as STORE_STATUS;
  campaignsBySatatus[status].names = [];
  for (const campaign in campaignsBySatatus[status]?.variables) {
    if (campaign === '_default') {
      continue;
    }
    campaignsBySatatus[status].names.push(campaign);
  }
}
