import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { interval } from "rxjs/observable/interval";

@Injectable()
export class TimerService {

  constructor() { }

  getTimer(): Observable<number> {
    return interval(10);
  }
}
