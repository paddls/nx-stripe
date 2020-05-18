import Stripe from 'stripe';
import {Inject, Injectable} from '@nestjs/common';
import {SERVER_CONFIG_TOKEN, ServerConfiguration} from './nx-stripe.module.di';
import {SubscriptionService} from './subscription.service';


@Injectable()
export class UsageService {

  private readonly stripe: Stripe;

  public constructor(@Inject(SERVER_CONFIG_TOKEN) config: ServerConfiguration,
                     private readonly subscriptionService: SubscriptionService) {
    this.stripe = new Stripe(config.privateKey, {
      apiVersion: '2020-03-02'
    });
  }

  public async create(customerId: string, featureId: string, idempotencyKey: string = null): Promise<any> {
    // TODO @RMA check subscription status
    // TODO @RMA check null result
    // TODO @RMA add typing
    // TODO @RMA handle errors
    // TODO @RMA create mapper library ?
    const subscriptionItem: any = await this.subscriptionService.findSubscriptionItemByCustomerIdAndFeatureId(customerId, featureId);

    return this.stripe.subscriptionItems.createUsageRecord(subscriptionItem.id, {
      quantity: 1,
      timestamp: StripeTimestamp.toTimestamp(new Date()),
      action: 'increment',
    }, {
      idempotencyKey,
    });
  }
}


export class StripeTimestamp {
  public static toDate(timestamp: number): Date {
    if (timestamp != null) {
      return new Date(timestamp * 1000);
    }
    return null;
  }

  public static toTimestamp(date: Date): number {
    return date ? (date.getTime() / 1000) | 0 : null;
  }
}
