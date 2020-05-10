import Stripe from 'stripe';
import {Inject, Injectable} from '@nestjs/common';
import {SERVER_CONFIG_TOKEN, ServerConfiguration} from './nx-stripe.module.di';
import {Plan, PlanLine, ProductService} from './product.service';
import {head} from 'lodash';


@Injectable()
export class SubscriptionService {

  private readonly stripe: Stripe;

  public constructor(@Inject(SERVER_CONFIG_TOKEN) config: ServerConfiguration,
                     private readonly productService: ProductService) {
    this.stripe = new Stripe(config.privateKey, {
      apiVersion: '2020-03-02'
    });
  }

  public async create(customerId: string, planId: string): Promise<any> {
    // TODO @RMA add typing
    // TODO @RMA avoid duplicate product subscription
    const plan: Plan = await this.productService.getPlanById(planId);

    return this.stripe.subscriptions.create({
      customer: customerId,
      metadata: {
        product: plan.productId,
        plan: planId,
      },
      items: plan.lines.map((l: PlanLine) => ({
        metadata: {
          feature: l.feature.id,
        },
        plan: l.id
      }))
    });
  }

  public async findSubscriptionItemByCustomerIdAndFeatureId(customerId: string, featureId: string): Promise<any> {
    const subscriptions: any = await this.stripe.subscriptions.list({
      customer: customerId
    });

    const subscription: any = head(subscriptions.data);

    return subscription ? subscription.items.data.find((item: any) => item.metadata.feature === featureId) : null;
  }
}
