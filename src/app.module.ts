import {Module} from '@nestjs/common';
import {NxStripeModule} from './nx-stripe.module';

@Module({
  imports: [
    NxStripeModule.forServer({
      privateKey: 'sk_test_vd9KiqO6bCnvJFQJNqA1vni300xxtid6dS'
    })
  ],
})
export class AppModule {
}
