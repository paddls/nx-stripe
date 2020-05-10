import Stripe from 'stripe';
import {Inject, Injectable} from '@nestjs/common';
import {SERVER_CONFIG_TOKEN, ServerConfiguration} from './nx-stripe.module.di';
import {Plan, PlanLine, ProductService} from './product.service';


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
    const plan: Plan = await this.productService.getPlanById(planId);

    return this.stripe.subscriptions.create({
      customer: customerId,
      items: plan.lines.map((l: PlanLine) => ({plan: l.id}))
    });
  }
}
