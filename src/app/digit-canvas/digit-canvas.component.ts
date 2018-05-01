import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DrawableDirective } from '../drawable.directive';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-digit-canvas',
  templateUrl: './digit-canvas.component.html',
  styleUrls: ['./digit-canvas.component.css']
})
export class DigitCanvasComponent implements OnInit {

  model: tf.Model;
  predictions: any;
  @Output() prediction = new EventEmitter<number>();

  constructor() { }

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    console.log('[numb3rflow] Loading tensor model');
    this.model = await tf.loadModel('/assets/model.json');
    console.log('[numb3rflow] Tensor model loaded');
  }

  async predict(imageData: ImageData) {

    const pred = await tf.tidy(() => {
 
      let image = tf.fromPixels(imageData, 1);
      image = image.reshape<any>([1, 28, 28, 1]);
      image = tf.cast(image, 'float32');

      const output = this.model.predict(image) as any;

      this.predictions = Array.from(output.dataSync());
      console.log(`[numb3rflow]\nPrediction matrix (index equals predicted number)\n[${this.predictions}]`);
      let predictedArray = this.predictions as number[]
      this.prediction.emit(predictedArray.reduce((max, x, i, array) => x > array[max] ? i : max, 0));
    });
  }

}
