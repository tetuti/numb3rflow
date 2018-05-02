import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appDrawable]'
})
export class DrawableDirective implements OnInit {
  position = { x: 0, y: 0 };
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  ongoingTouches = [];

  @Output() newImage = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.canvas = this.element.nativeElement as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
  }

  // @HostListener('mouseup', ['$event'])
  // onUp(e) {
  //   this.newImage.emit(this.getImgData());
  // }

  @HostListener('mouseleave', ['$event'])
  onLeave(e) {
    this.newImage.emit(this.getImgData());
  }

  @HostListener('mouseenter', ['$event'])
  onEnter(e) {
    this.clear();
    this.setPosition(e);
    
  }

  @HostListener('mousedown', ['$event'])
  onDown(e) {
    this.setPosition(e);
  }

  @HostListener('mousemove', ['$event'])
  onMove(e) {

    if (e.buttons !== 1) {
      return;
    }

    this.context.beginPath();
    this.context.lineWidth = 10;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#444444';

    this.context.moveTo(this.position.x, this.position.y);
    this.setPosition(e);
    this.context.lineTo(this.position.x, this.position.y);

    this.context.stroke();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(e) {
    e.preventDefault();
    this.clear();
    this.setTouchPositon(e);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(e) {
    e.preventDefault();
    if (e.type !== 'touchmove') {
      return;
    }

    this.context.beginPath();
    this.context.lineWidth = 10;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#444444';

    this.context.moveTo(this.position.x, this.position.y);
    this.setTouchPositon(e);
    this.context.lineTo(this.position.x, this.position.y);

    this.context.stroke();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e) {
    this.newImage.emit(this.getImgData());
  }

  @HostListener('resize', ['$event'])
  onResize(e) {
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
  }

  setPosition(e) {
    this.position.x = e.offsetX;
    this.position.y = e.offsetY;
  }

  setTouchPositon(e) {
    let boundingRectangle = e.target.getBoundingClientRect();
    this.position.x = e.targetTouches[0].pageX - boundingRectangle.left;
    this.position.y = e.targetTouches[0].pageY - boundingRectangle.top;
    console.log(`target: ${e.target}\nx: ${this.position.x}\ny: ${this.position.x}`)
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  getImgData(): ImageData {
    const scaled = this.context.drawImage(this.canvas, 0, 0, 28, 28);
    return this.context.getImageData(0, 0, 28, 28);
  }
}