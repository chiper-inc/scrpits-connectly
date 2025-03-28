import { TypeCampaignVariables, TypeStore } from '../types.ts';
import { IUtm } from '../integrations/interfaces.ts';
import { CampaignService } from './campaign.service.ts';
import { ClevertapMessageService } from './clevertap.message.service.ts';
import { ICallToActionLink } from '../main.ts';
import { ClevertapPushNotificationAI } from './clevertap.vertex-ai.ts';
import * as MOCKS from '../mocks/clevertap-campaigns.mock.ts';

export class ClevertapCampaignService extends CampaignService {
  constructor(
    store: TypeStore,
    campaignName: string,
    varibales: TypeCampaignVariables,
    utm: IUtm,
    lng: string,
  ) {
    super(varibales, lng);
    const n = MOCKS.version === 'v2' ? 6 : 3;
    for (let i = 0; i < n; i++) {
      this.messageValues.push(
        new ClevertapMessageService(store, campaignName, utm),
      );
    }
  }

  public setPathVariables(shortLinks: ICallToActionLink[]): this {
    const paths: string[] = [];
    for (const variable in this.variableValues) {
      if (variable.startsWith('path')) {
        paths.push(variable);
      }
    }

    paths.forEach((path, i) => {
      const shortLink = this.getPathVariable(
        shortLinks[i].fullUrl ?? `https://tienda.chiper.co/shortlink_${i + 1}`,
      );
      this.variableValues[path] = shortLink;
    });

    return this;
  }

  private getPathVariable(url: string): string {
    return url;
  }

  public async setMessagesVariables(): Promise<this> {
    const pushNotificationGenerator = ClevertapPushNotificationAI.getInstance();
    const pushNotificationContent =
      (await pushNotificationGenerator.generateContent(
        this.variableValues,
      )) as unknown as { titles: string[]; products: string[] };

    const splitedVars = this.splitVariables(this.variables);
    this.mergeVariablesTitleAndProduct(
      splitedVars,
      pushNotificationContent.titles,
      pushNotificationContent.products,
    );

    this.messageValues.forEach((message, index) => {
      message.setVariables(splitedVars[index]);
    });
    return Promise.resolve(this);
  }

  private mergeVariablesTitleAndProduct(
    variables: TypeCampaignVariables[],
    titles: string[],
    products: string[],
  ): void {
    const getTitle = (titles: string[], i: number): string =>
      titles[i % titles.length];

    const getProductMessage = (products: string[], i: number): string => {
      const offset = Math.ceil(products.length / 2);
      return `${products[i % products.length]}\n${products[(i + offset) % products.length]}`;
    };

    variables.forEach((variable, i) => {
      variable.title = getTitle(titles, i);
      variable.message = getProductMessage(products, i);
    });
  }

  private splitVariables(
    variables: TypeCampaignVariables,
  ): TypeCampaignVariables[] {
    const map = new Map<number, TypeCampaignVariables>();
    const common: TypeCampaignVariables = {};
    for (const [k, value] of Object.entries(variables)) {
      const [key, index] = k.split('_');
      if (!index) {
        common[key] = value;
        continue;
      }

      const i = Number(index);
      if (Number.isNaN(i)) continue;

      const obj: TypeCampaignVariables = map.get(i) || {};
      obj[key] = value;
      map.set(i, obj);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([, value]) => ({ ...common, ...value }));
  }
}

// const x = new ClevertapService();
// console.log(x.xxx({
//   name: 'John Doe', path: "www.google.com",
//   sku_1: 'Cereal Edicion Barbie - Kellogg´s - Paquete 75 g',
//   dsct_1: '1.2%',
//   name_2: 'name2',
//   sku_2: 'Aceite Vegetal de Soya De Primera - DE PRIMERA - Cuñete 18 l',
//   dsct_2: '2.5%',
//   img_1: 'https://chiper-old-imgs.imgix.net/app/7702404005034-HkP4mupji-R.png?w=800&h=400&fit=fill&bg=white',
//   img_2: 'https://chiper-old-imgs.imgix.net/app/7702535011706-H1cEmdajo-R.png?w=800&h=400&fit=fill&bg=white',
// }));
