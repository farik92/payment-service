import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as https from 'https';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import * as process from 'node:process';

@Injectable()
export class TbankService {
  private readonly httpsAgent: https.Agent;
  private readonly baseUrl: string;
  private readonly baseUrlV2: string;
  private readonly bearerToken: string;
  readonly accountNumber: string;

  constructor() {
    this.httpsAgent = new https.Agent({
      cert: fs.readFileSync(process.env.TBANK_PEM),
      key: fs.readFileSync(process.env.TBANK_KEY),
    });
    this.baseUrl = process.env.TBANK_URL || '';
    this.baseUrlV2 = process.env.TBANK_URL_V2 || '';
    this.bearerToken = process.env.TBANK_TOKEN || '';
    this.accountNumber = process.env.TBANK_ACCOUNT || '';
  }

  async request<T>(
    endpoint: string,
    method: string,
    body?: any,
    headers: Record<string, string> = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
          'Content-Type': 'application/json',
          ...headers,
        },
        agent: this.httpsAgent,
      });

      if (!response.ok) {
        throw new HttpException(response.statusText, response.status);
      }

      return (await response.json()) as T;
    } catch (error) {
      throw new Error(`Error during request to ${url}: ${error.message}`);
    }
  }

  async v2request<T>(
    endpoint: string,
    method: string,
    body?: any,
    headers: Record<string, string> = {},
  ): Promise<T> {
    const url = `${this.baseUrlV2}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
          'Content-Type': 'application/json',
          ...headers,
        },
        agent: this.httpsAgent,
      });

      if (!response.ok) {
        throw new HttpException(response.statusText, response.status);
      }

      return (await response.json()) as T;
    } catch (error) {
      throw new Error(`Error during request to ${url}: ${error.message}`);
    }
  }

  async getBalance(beneficiaryId: string): Promise<any> {
    return this.request<any>(
      `virtual-accounts/balances?beneficiaryId=${beneficiaryId}`,
      'GET',
    );
  }

  async completeDealSteps(dealId: string, stepId: string): Promise<any[]> {
    return this.request<any>(
      `deals/${dealId}/steps/${stepId}/complete`,
      'POST',
    );
  }
}
