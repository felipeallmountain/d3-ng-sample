import { Component, ViewChild, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-sample-chart',
  templateUrl: './sample-chart.component.html',
  styleUrls: ['./sample-chart.component.css']
})
export class SampleChartComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: any[];

  private svg;

  private width = 600;
  private height = 200;

  private margin = { top: 20, bottom: 20, left: 40, right: 20 };

  private colors = {
    math: 'blue',
    science: 'orange',
    language: 'green'
  };

  private xScale;
  private xAxis;
  private yScale;
  private yAxis;

  private subject = 'math';

  ngOnInit() {
    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .call(this.responsivefy)
      .append('g')
        .attr('class', 'svg-content')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.setScales();
    this.render();
  }

  ngOnChanges() {
    if (!this.svg) {
      return;
    }
    if (!this.data) {
      return;
    }
    this.render();
  }

  ngOnDestroy() {
    d3.select(this.chartContainer.nativeElement).select('.svg-content').remove();
  }

  changeSubject(subject: string): void {
    if (this.subject === subject) {
      return;
    }
    this.subject = subject;
    this.render();
  }

  setScales() {
    this.xScale = d3.scaleBand()
      .domain(this.data.map(d => d.name))
      .range([0, this.width])
      .padding(0.2);

    this.xAxis = this.svg
      .append('g')
        .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d[this.subject])])
      .range([this.height, 0]);

    this.yAxis = this.svg
      .append('g')
      .call(d3.axisLeft(this.yScale));
  }

  render() {
    const t = d3.transition().duration(1000);

    const update = this.svg
      .selectAll('rect')
      .data(
        this.data.filter(d => d[this.subject]), d => d.name
      );

    update.exit()
      .transition(t)
      .attr('y', this.height)
      .attr('height', 0)
      .remove();

    this.xScale.domain(this.data.map(d => d.name));
    this.xAxis
      .transition(t)
      .call(d3.axisBottom(this.xScale));

    this.yScale.domain([0, d3.max(this.data, d => d[this.subject])]);
    this.yAxis
      .transition(t)
      .call(d3.axisLeft(this.yScale));

    update
      .transition(t)
      .delay(1000)
      .attr('y', d => this.yScale(d[this.subject]))
      .attr('height', d => this.height - this.yScale(d[this.subject]))
      .style('fill', this.colors[this.subject]);

    update.enter()
      .append('rect')
      .attr('y', this.height)
      .attr('x', d => this.xScale(d.name))
      .attr('width', d => this.xScale.bandwidth())
      .style('fill', this.colors[this.subject])
      .transition(t)
      .delay(update.exit().size() ? 1000 : 0)
      .attr('y', d => this.yScale(d[this.subject]))
      .attr('height', d => this.height - this.yScale(d[this.subject]));
  }



  // resize viewport
  responsivefy(box) {
    const container = d3.select(box.node().parentNode);
    const boxWidth = parseInt(box.style('width'), 10);
    const boxHeight = parseInt(box.style('height'), 10);
    const aspect = boxWidth / boxHeight;

    box.attr('viewBox', '0 0 ' + boxWidth + ' ' + boxHeight)
      .attr('preserveAspetRatio', 'xMinYMid')
      .call(resize);

      d3.select(window).on('resize.' + container.attr('id'), resize );

    function resize() {
      const targetWidth = parseInt(container.style('width'), 10);
      box.attr('width', targetWidth);
      box.attr('height', Math.round(targetWidth / aspect));
    }
  }

}
