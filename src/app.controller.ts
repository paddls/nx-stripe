import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class AppController {

  public constructor(private readonly appService: ProductService) {}

  @Get('/products')
  public getProducts(): Promise<any> {
    return this.appService.getProducts();
  }
}
