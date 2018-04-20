import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-code-sample',
  templateUrl: './code-sample.component.html',
  styleUrls: ['./code-sample.component.css']
})
export class CodeSampleComponent implements OnInit {

  ngOnInit() {
    // this.printLinearScales();
    // this.printTimeScales();
    // this.printQuantizeScales();
    this.printOrdinalScales();


  }

  printLinearScales() {
    const linearScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 600]);
    // const linearScale = d3.scaleLinear()
    //   .domain([0, 100])
    //   .range([0, 1])
    //   .clamp(true);

    console.log(linearScale(105));
  }

  printTimeScales() {
    
    const timeScale = d3.scaleTime()
      .domain([new Date(1982, 5, 26), new Date()])
      .range([0, 100]);

    // console.log(timeScale(new Date()));
    // console.log(timeScale(new Date(2005, 5, 18)));
    // console.log(timeScale.invert(50));
  }

  printQuantizeScales() {
    const quantizeScale = d3.scaleQuantize()
      .domain([0, 1000])
      .range(<any>['yellow', 'red', 'green', 'blue']);

    console.log(quantizeScale(55));
    // console.log(quantizeScale(60));
    console.log(quantizeScale.invertExtent(<any>'green'));
  }

  printOrdinalScales() {
    const ordinalScale = d3.scaleOrdinal()
      .domain(['bad', 'good', 'great'])
      .range(['red', 'white', 'green']);

    console.log(ordinalScale('good'));
    // console.log(ordinalScale('poor'));
    // console.log(ordinalScale('great'));
  }

}
