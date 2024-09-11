import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createHello() {
    //return 'you used post request';
    return {
      response: 'you used post request',
      code: 200,
    };
  }
}
