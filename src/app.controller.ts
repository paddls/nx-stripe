import {Body, Controller, Get, Post} from '@nestjs/common';
import {ProductService} from './product.service';
import {Customer, CustomerService} from './customer.service';
import {SubscriptionService} from './subscription.service';
import {UsageService} from './usage.service';

@Controller()
export class AppController {

  public constructor(private readonly productService: ProductService,
                     private readonly customerService: CustomerService,
                     private readonly usageService: UsageService,
                     private readonly subscriptionService: SubscriptionService) {
  }

  // TODO @RMA @Server CUD products

  @Get('/products') // TODO @Server
  public getProducts(): Promise<any> {
    return this.productService.getAll();
  }

  // TODO @RMA @Client U customers

  @Post('/customers') // TODO @Client
  public createCustomer(@Body() customer: Customer): Promise<any> {
    return this.customerService.create(customer);
  }

  // TODO @RMA @Server RUD subscriptions

  @Post('/subscriptions') // TODO @Server
  public createSubscription(@Body() data: any): Promise<any> {
    return this.subscriptionService.create(data.customerId, data.planId);
  }

  // TODO @RMA Server R usages

  @Post('/usages') // TODO @Client
  public createUsage(@Body() data: any): Promise<any> {
    return this.usageService.create(data.customerId, data.featureId);
  }
}
