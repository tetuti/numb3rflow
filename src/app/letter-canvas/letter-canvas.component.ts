import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DrawableDirective } from '../drawable.directive';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-letter-canvas',
  templateUrl: './letter-canvas.component.html',
  styleUrls: ['./letter-canvas.component.css']
})
export class LetterCanvasComponent implements OnInit {

  model: tf.Model;
  predictions: any;
  @Output() prediction = new EventEmitter<number>();

  constructor() { }

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    console.log('[letterflow] Loading tensor model');
    this.model = await tf.loadModel('/assets/model.json');
    console.log('[letterflow] Tensor model loaded');
  }

  async predict(imageData: ImageData) {

    const pred = await tf.tidy(() => {
 
      let image = tf.fromPixels(imageData, 1);
      image = image.reshape<any>([1, 28, 28, 1]);
      image = tf.cast(image, 'float32');

      const output = this.model.predict(image) as any;

      this.predictions = Array.from(output.dataSync());
      console.log(`predicition matrix (index equals predicted number)\n[${this.predictions}]`);
      let predictedArray = this.predictions as number[]
      this.prediction.emit(predictedArray.reduce((max, x, i, array) => x > array[max] ? i : max, 0));
    });
  }

}
