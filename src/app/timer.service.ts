import { Injectable } from '@angular/core';

import { Observable ,  interval } from 'rxjs';

@Injectable()
export class TimerService {

  constructor() { }

  getTimer(): Observable<number> {
    return interval(10);
  }
}
