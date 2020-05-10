import {DynamicModule, Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {AppController} from './app.controller';
import {SERVER_CONFIG_TOKEN, ServerConfiguration} from './nx-stripe.module.di';
import {CustomerService} from './customer.service';
import {SubscriptionService} from './subscription.service';
import {UsageService} from './usage.service';


@Module({
  providers: [
    {
      provide: SERVER_CONFIG_TOKEN,
      useValue: {}
    },
  ],
})
export class NxStripeModule {
  public static forServer(config: ServerConfiguration): DynamicModule {
    return {
      module: NxStripeModule,
      controllers: [
        AppController
      ],
      providers: [
        {
          provide: SERVER_CONFIG_TOKEN,
          useValue: config
        },
        ProductService,
        CustomerService,
        SubscriptionService,
        UsageService,
      ],
      exports: [],
    };
  }
}


// TODO @RMA stripe error handling
// TODO @RMA guards for admin (products write) / customer (subscriptions) / system (customer, usages)
