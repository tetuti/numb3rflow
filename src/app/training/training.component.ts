import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  prediction: number;

  constructor() { }

  ngOnInit() {
  }

  onPrediction(prediction: number) {
    this.prediction = prediction;
  }

}
