import { Injectable } from '@nestjs/common';
//import { CreateStepDto } from './dto/create-step.dto';
//import { UpdateStepDto } from './dto/update-step.dto';
import { TbankService } from '../../tbank.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StepsService {
  constructor(private readonly tbankService: TbankService) {}

  async create(id: string, body: any): Promise<any[]> {
    return this.tbankService.request<any>(`deals/${id}/steps`, 'POST', body, {
      'Idempotency-Key': uuidv4(),
    });
  }

  async findAll(id: string): Promise<any[]> {
    return this.tbankService.request<any>(`deals/${id}/steps`, 'GET');
  }

  async update(dealId: string, id: string, body: any) {
    return this.tbankService.request<any>(
      `deals/${dealId}/steps/${id}`,
      'PUT',
      body,
    );
  }

  async remove(dealId: string, id: string) {
    return this.tbankService.request<any>(
      `deals/${dealId}/steps/${id}`,
      'DELETE',
    );
  }
}
