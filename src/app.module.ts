import {Module} from '@nestjs/common';
import {NxStripeModule} from './nx-stripe.module';

@Module({
  imports: [
    NxStripeModule.forServer({
      privateKey: process.env.stripePrivateKey,
    })
  ],
})
export class AppModule {
}
