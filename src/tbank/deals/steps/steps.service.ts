import { Injectable } from '@nestjs/common';
import { TbankService } from '../../tbank.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StepsService {
  constructor(private readonly tbankService: TbankService) {}

  async create(dealId: string, body: any): Promise<any[]> {
    return await this.tbankService.request<any>(
      `deals/${dealId}/steps`,
      'POST',
      body,
      {
        'Idempotency-Key': uuidv4(),
      },
    );
  }

  async findAll(dealId: string): Promise<any[]> {
    return await this.tbankService.request<any>(`deals/${dealId}/steps`, 'GET');
  }

  async update(dealId: string, stepId: string, body: any) {
    return await this.tbankService.request<any>(
      `deals/${dealId}/steps/${stepId}`,
      'PUT',
      body,
    );
  }

  async remove(dealId: string, stepId: string) {
    return await this.tbankService.request<any>(
      `deals/${dealId}/steps/${stepId}`,
      'DELETE',
    );
  }

  async complete(dealId: string, stepId: string) {
    return await this.tbankService.request<any>(
      `deals/${dealId}/steps/${stepId}/complete`,
      'POST',
    );
  }
}
