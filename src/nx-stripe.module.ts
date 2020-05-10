import {DynamicModule, Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {AppController} from './app.controller';
import {SERVER_CONFIG_TOKEN, ServerConfiguration} from './nx-stripe.module.di';


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
      ],
      exports: [],
    };
  }
}
