import {Controller, Get, Post} from '@nestjs/common';
import { ProductService } from './product.service';
import {Customer, CustomerService} from './customer.service';

@Controller()
export class AppController {

  public constructor(private readonly productService: ProductService,
                     private readonly customerService: CustomerService) {}

  @Get('/products')
  public getProducts(): Promise<any> {
    return this.productService.getProducts();
  }

  @Post('/customers')
  public createCustomer(): Promise<any> {
    return this.customerService.createCustomer(new Customer({
      name: 'Romain',
      email: 'romain.martineau@witty-services.fr',
      lang: 'fr',
      metadata: {
        userId: '2'
      }
    }));
  }
}
