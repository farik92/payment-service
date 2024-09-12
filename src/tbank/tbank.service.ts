import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as https from 'https';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import * as process from 'node:process';

@Injectable()
export class TbankService {
  private readonly httpsAgent: https.Agent;

  constructor() {
    this.httpsAgent = new https.Agent({
      cert: fs.readFileSync(process.env.TBANK_PEM),
      key: fs.readFileSync(process.env.TBANK_KEY),
    });
  }

  async getBeneficiaries() {
    const url = process.env.TBANK_URL + 'beneficiaries';
    const bearerToken = process.env.TBANK_TOKEN;

    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        agent: this.httpsAgent,
      });
      if (!response.ok) {
        throw new HttpException(response.statusText, response.status);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error on get beneficiaries: ${error}`);
    }
  }

  async createBeneficiary(data: any) {
    const url = process.env.TBANK_URL + 'beneficiaries';
    const bearerToken = process.env.TBANK_TOKEN;

    try {
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': uuidv4(),
          Accept: 'application/json',
        },
        agent: this.httpsAgent,
      });
      if (!response.ok) {
        return await response.json();
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error on create beneficiary: ${error}`);
    }
  }

  async getBalance(data: any) {
    const url =
      process.env.TBANK_URL + `virtual-accounts/balances?beneficiaryId=${data}`;
    const bearerToken = process.env.TBANK_TOKEN;
    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        agent: this.httpsAgent,
      });
      if (!response.ok) {
        throw new HttpException(response.statusText, response.status);
      }
      const balance = await response.json();
      return balance.results;
    } catch (error) {
      throw new Error(`Error on get balance: ${error}`);
    }
  }
}
