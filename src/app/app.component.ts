import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private data1 = [
    {name: 'Pedro', math: 37, science: 62, language: 54},
    {name: 'Pablo', math: null, science: 33, language: 90},
    {name: 'Caro', math: 86, science: 48, language: null},
    {name: 'Juan', math: 44, science: null, language: 65},
    {name: 'Ana', math: 59, science: 79, language: 99}
  ];

  private data2 = [
    {name: 'Jose', math: 75, science: 14, language: null},
    {name: 'Felipe', math: 54, science: 86, language: 23},
    {name: 'Carlos', math: null, science: 78, language: 76},
    {name: 'Laura', math: 23, science: 23, language: 67}
  ];

  private graphData: any[];

  ngOnInit() {
    this.setData(this.data1);
  }

  setData(dat): void {
    this.graphData = dat;
  }
}
