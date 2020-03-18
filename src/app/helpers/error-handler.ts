import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageHandler {

  constructor(
  ) {}

  public showMessage(err: any) {
    console.error('Exception', err);
  }
}
