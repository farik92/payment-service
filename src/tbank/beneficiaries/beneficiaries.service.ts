import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TbankService } from '../tbank.service';

@Injectable()
export class BeneficiariesService {
  constructor(private readonly tbankService: TbankService) {}

  async findAll(offset: number): Promise<any[]> {
    return await this.tbankService.request<any>(
      `beneficiaries?offset=${offset ? offset : 0}`,
      'GET',
    );
  }

  async findOne(id: string): Promise<any[]> {
    return await this.tbankService.request<any>(`beneficiaries/${id}`, 'GET');
  }

  async create(data: Record<string, any>): Promise<any> {
    return await this.tbankService.request<any>('beneficiaries', 'POST', data, {
      'Idempotency-Key': uuidv4(),
    });
  }

  async update(data: Record<string, any>, id: string): Promise<any> {
    return await this.tbankService.request<any>(
      `beneficiaries/${id}`,
      'PUT',
      data,
    );
  }

  async scoringAll(): Promise<any[]> {
    return await this.tbankService.v2request<any>(
      `beneficiaries/scoring?passed=true`,
      'GET',
    );
  }

  async scoringOne(id: string): Promise<any[]> {
    return await this.tbankService.v2request<any>(
      `beneficiaries/scoring?beneficiaryId=${id}&passed=false`,
      'GET',
    );
  }
}
