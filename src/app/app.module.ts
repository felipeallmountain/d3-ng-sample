import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SampleChartComponent } from './sample-chart/sample-chart.component';
import { CodeSampleComponent } from './code-sample/code-sample.component';


@NgModule({
  declarations: [
    AppComponent,
    SampleChartComponent,
    CodeSampleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
