import { Injectable } from '@nestjs/common';
import { CreateVirtualAccountDto } from './dto/create-virtual-account.dto';
import { UpdateVirtualAccountDto } from './dto/update-virtual-account.dto';
import { TbankService } from '../tbank.service';

@Injectable()
export class VirtualAccountsService {
  constructor(private readonly tbankService: TbankService) {}

  async transfers(offset: number): Promise<any[]> {
    return await this.tbankService.request<any>(
      `transfers?accountNumber=${this.tbankService.accountNumber}&offset=${offset ? offset : 0}`,
      'GET',
    );
  }

  create(createVirtualAccountDto: CreateVirtualAccountDto) {
    return 'This action adds a new virtualAccount';
  }

  findAll() {
    return `This action returns all virtualAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} virtualAccount`;
  }

  update(id: number, updateVirtualAccountDto: UpdateVirtualAccountDto) {
    return `This action updates a #${id} virtualAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} virtualAccount`;
  }
}
