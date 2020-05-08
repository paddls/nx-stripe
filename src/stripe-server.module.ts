import {DynamicModule, Module} from '@nestjs/common';

@Module({
  providers: [],
})
export class StripeServerModule {
  static forRoot(config: any = {}): DynamicModule {
    return {
      module: StripeServerModule,
      providers: [],
      exports: [],
    };
  }
}
