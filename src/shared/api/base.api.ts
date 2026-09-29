import type { AxiosInstance } from 'axios';

export abstract class BaseApi {
  protected readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }
}
