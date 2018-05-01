import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DigitCanvasComponent } from './digit-canvas/digit-canvas.component';
import { DrawableDirective } from './drawable.directive';
import { TrainingComponent } from './training/training.component';
import { FlowComponent } from './flow/flow.component';
import { FaqComponent } from './faq/faq.component';
import { TimerService } from './timer.service';
import { TimerPipe } from './flow/timer.pipe';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DigitCanvasComponent,
    DrawableDirective,
    TrainingComponent,
    FlowComponent,
    FaqComponent,
    TimerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//TODO ord skriv bokstav tid
