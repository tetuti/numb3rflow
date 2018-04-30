import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LetterCanvasComponent } from './letter-canvas/letter-canvas.component';
import { DrawableDirective } from './drawable.directive';
import { TrainingComponent } from './training/training.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LetterCanvasComponent,
    DrawableDirective,
    TrainingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//TODO ord skriv bokstav tid
