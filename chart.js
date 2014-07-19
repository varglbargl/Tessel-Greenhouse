var data = [
  {temp: 75.5623, date:new Date('Jan 2007')},
  {temp: 22.7314, date:new Date('Feb 2007')},
  {temp: 44.7434, date:new Date('Mar 2007')},
  {temp: 55.7434, date:new Date('Apr 2007')},
  {temp: 99.7434, date:new Date('May 2007')},
  {temp: 22.7434, date:new Date('Jun 2007')},
  {temp: 199.7434, date:new Date('Jul 2007')}
];

var yLabel = 'Degrees (F)';

var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parse = d3.time.format("%b %Y").parse;

// Scales and axes. Note the inverted domain for the y-scale: bigger is up!
var x = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true),
    yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

// A line generator, for the dark stroke.
var line = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temp); });

// Compute the minimum and maximum date, and the maximum price.
x.domain([data[0].date, data[data.length - 1].date]);
y.domain([0, d3.max(data, function(d) { return d.temp; })]).nice();

// Add an SVG element with the desired dimensions and margin.
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .on("click", click);

// Add the clip path.
svg.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

// Add the area path.
svg.append("path")
    .attr("class", "area")
    .attr("clip-path", "url(#clip)");

// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxis);

// Add the line path.
svg.append("path")
    .attr("class", "line")
    .attr("clip-path", "url(#clip)")
    .attr("d", line(data));

// Add a small label for the symbol name.
svg.append("text")
    .attr("x", width - 6)
    .attr("y", height - 6)
    .style("text-anchor", "end")
    .text(yLabel);

// On click, update the x-axis.
function click() {
  // var n = data.length - 1,
  //     i = Math.floor(Math.random() * n / 2),
  //     j = i + Math.floor(Math.random() * n / 2) + 1;
  // x.domain([data[i].date, data[j].date]);
  // var t = svg.transition().duration(750);
  // t.select(".x.axis").call(xAxis);
  // t.select(".line").attr("d", line(data));
}

// Parse dates and numbers. We assume data are sorted by date.
function type(d) {
  d.date = parse(d.date);
  d.temp = +d.temp;
  return d;
}