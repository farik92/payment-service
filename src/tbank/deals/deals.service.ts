import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { TbankService } from '../tbank.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DealsService {
  constructor(private readonly tbankService: TbankService) {}

  async create(): Promise<any[]> {
    const data = { accountNumber: this.tbankService.accountNumber };
    return await this.tbankService.request<any>('deals', 'POST', data, {
      'Idempotency-Key': uuidv4(),
    });
  }

  async findAll(): Promise<any[]> {
    return await this.tbankService.request<any>('deals', 'GET');
  }

  async toDraft(id: string): Promise<any[]> {
    return this.tbankService.request(`deals/${id}/draft`, 'POST');
  }

  async accept(id: string): Promise<any[]> {
    return await this.tbankService.request(`deals/${id}/accept`, 'POST');
  }

  async cancel(id: string): Promise<any[]> {
    return await this.tbankService.request(`deals/${id}/cancel`, 'POST');
  }

  async isValid(id: string): Promise<any[]> {
    return await this.tbankService.request(`deals/${id}/is-valid`, 'GET');
  }

  async remove(id: string): Promise<any[]> {
    return await this.tbankService.request(`deals/${id}`, 'DELETE');
  }
}
