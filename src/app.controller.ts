import {Body, Controller, Get, Post} from '@nestjs/common';
import {ProductService} from './product.service';
import {Customer, CustomerService} from './customer.service';
import {SubscriptionService} from './subscription.service';

@Controller()
export class AppController {

  public constructor(private readonly productService: ProductService,
                     private readonly customerService: CustomerService,
                     private readonly subscriptionService: SubscriptionService) {
  }

  @Get('/products')
  public getProducts(): Promise<any> {
    return this.productService.getAll();
  }

  @Post('/customers')
  public createCustomer(@Body() customer: Customer): Promise<any> {
    return this.customerService.create(customer);
  }

  @Post('/subscriptions')
  public subscription(@Body() data: any): Promise<any> {
    return this.subscriptionService.create(data.customerId, data.planId);
  }
}
