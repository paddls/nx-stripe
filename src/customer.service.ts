import Stripe from 'stripe';
import {Inject, Injectable} from '@nestjs/common';
import {SERVER_CONFIG_TOKEN, ServerConfiguration} from './nx-stripe.module.di';


export class Customer {
  public id: string;
  public name: string;
  public email: string;
  public metadata: { [key: string]: string };
  public lang: string;

  public constructor(data: Partial<Customer> = {}) {
    Object.assign(this, data);
  }
}

@Injectable()
export class CustomerService {

  private readonly stripe: Stripe;

  public constructor(@Inject(SERVER_CONFIG_TOKEN) config: ServerConfiguration) {
    this.stripe = new Stripe(config.privateKey, {
      apiVersion: '2020-03-02'
    });
  }

  public async create(customer: Customer): Promise<Customer> {
    return this.stripe.customers.create({
      name: customer.name,
      email: customer.email,
      preferred_locales: [customer.lang],
      metadata: customer.metadata
    }).then((data: any) => {
      return new Customer({
        id: data.id,
        ...customer
      })
    });
  }
}
