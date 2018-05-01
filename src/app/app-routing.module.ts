import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './training/training.component';
import { FlowComponent } from './flow/flow.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  { path: '', redirectTo: '/train', pathMatch: 'full' },
  { path: 'train', component: TrainingComponent },
  { path: 'flow', component: FlowComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
