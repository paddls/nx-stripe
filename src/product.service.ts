import Stripe from 'stripe';
import {Inject, Injectable} from '@nestjs/common';
import {SERVER_CONFIG_TOKEN, ServerConfiguration} from './nx-stripe.module.di';
import {keyBy, mapValues, reduce} from 'lodash';

export class Product {
  public id: string;
  public plans: Plan[];

  public constructor(data: Partial<Product> = {}) {
    Object.assign(this, data);
  }
}

export class Plan {
  public id: string;
  public lines: PlanLine[];

  public constructor(data: Partial<Plan> = {}) {
    Object.assign(this, data);
  }
}

export class PlanLine {
  public id: string;
  public planId: string;
  public productId: string;
  public feature: Feature;

  public constructor(data: Partial<PlanLine> = {}) {
    Object.assign(this, data);
  }
}

export class Feature {
  public id: string;

  public constructor(data: Partial<Feature> = {}) {
    Object.assign(this, data);
  }
}

@Injectable()
export class ProductService {

  private readonly stripe: Stripe;

  public constructor(@Inject(SERVER_CONFIG_TOKEN) config: ServerConfiguration) {
    this.stripe = new Stripe(config.privateKey, {
      apiVersion: '2020-03-02'
    });
  }

  public async getProducts(): Promise<Product[]> {
    const [pricing, feature] = await Promise.all([this.stripe.plans.list(), this.stripe.products.list()]);

    const productsKeyById = mapValues(keyBy(feature.data, 'id'), 'metadata.product');
    const featureKeyByProductIdId = mapValues(keyBy(feature.data, 'id'), 'metadata.feature');

    const planLines = pricing.data.map((line: Stripe.Plan) => new PlanLine({
      id: line.id,
      planId: line.metadata.plan,
      productId: productsKeyById[line.product as string],
      feature: new Feature({
        id: featureKeyByProductIdId[line.product as string]
      })
    }));

    return reduce(planLines, (acc: Product[], line: PlanLine) => {
      let product: Product = acc.find((p: Product) => p.id === line.productId);

      if (product == null) {
        product = new Product({
          id: line.productId,
          plans: []
        });
        acc.push(product);
      }

      let plan: Plan = product.plans.find((p: Plan) => p.id === line.planId);
      if (plan == null) {
        plan = new Plan({
          id: line.planId,
          lines: []
        });
        product.plans.push(plan);
      }
      plan.lines.push(line);


      return acc;
    }, []);
  }
}
