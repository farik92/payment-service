import { Injectable, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import * as fs from 'fs';
import * as https from 'https';

@Injectable()
export class TbankService {
  private readonly httpsAgent: https.Agent;

  constructor(private httpService: HttpService) {
    this.httpsAgent = new https.Agent({
      cert: fs.readFileSync(process.env.TBANK_PEM),
      key: fs.readFileSync(process.env.TBANK_KEY),
      rejectUnauthorized: true,
    });
  }

  async getBeneficiaries() {
    const url = process.env.TBANK_URL + 'beneficiaries';
    const bearerToken = process.env.TBANK_TOKEN;

    const response = await lastValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        httpsAgent: this.httpsAgent,
      }),
    );

    return response.data;
  }

  async createBeneficiary(data: JSON) {
    const url = process.env.TBANK_URL + 'beneficiaries';
    const bearerToken = process.env.TBANK_TOKEN;

    try {
      const response = await lastValueFrom(
        this.httpService.request({
          url: url,
          method: 'POST',
          data: data,
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': '113f08af-35c5-43c2-ae3b-9016bdbb8fbb',
            Accept: 'application/json',
          },
          httpsAgent: this.httpsAgent,
          validateStatus: function () {
            return true;
          },
        }),
      );
      return await response.data;
    } catch (error) {
      throw new Error(`Error making payment: ${error}`);
    }
  }

  async makePayment() {
    const url = process.env.TBANK_TEST_URL;

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, {
          headers: {
            Authorization: `Bearer ${process.env.TBANK_TEST_TOKEN}`,
            'Content-Type': 'application/json',
          },
          httpsAgent: this.httpsAgent,
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error making payment: ${error.message}`);
    }
  }
}
