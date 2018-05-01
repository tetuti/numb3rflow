import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {

  challenges: number[];
  prediction: number;
  state: 'stopped' | 'started' | 'finished';
  timer: Subscription;
  currentTime: number = 0;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.state = 'stopped';
    this.seedChallenges();
  }

  onPredict(prediction: number) {
    if (this.state != 'started') {
      this.state = 'started';
      this.timer = this.timerService.getTimer().subscribe(time => this.currentTime = time);
    }
    this.prediction = prediction;

    if (prediction === this.challenges[0]) {
      this.challenges.shift();
    }
    if (this.challenges.length === 0) {
      this.state = 'finished';
      this.timer.unsubscribe();
    } 
  }

  seedChallenges() {
    this.challenges = Array.from({length: 5}, () => Math.floor(Math.random() * 9))
  }

  reset() {
    this.currentTime = 0;
    this.seedChallenges();
    this.state = 'stopped';
  }

}
