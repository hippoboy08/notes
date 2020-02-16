import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { TooltipsDirective } from './directives/tooltips.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertComponent,
    LoadingComponent,
    TooltipsDirective
  ],
  exports: [
    AlertComponent,
    LoadingComponent,
    TooltipsDirective
  ]
})
export class SharedModule {}