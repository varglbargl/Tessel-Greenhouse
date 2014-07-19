var data = [
  {temp: 75.5623, humid:55.6235, date:new Date('Jan 2007 6:00')},
  {temp: 22.7314, humid:74.6235, date:new Date('Jan 2007 7:00')},
  {temp: 44.7434, humid:32.6235, date:new Date('Jan 2007 8:00')},
  {temp: 55.7434, humid:53.6235, date:new Date('Jan 2007 9:00')},
  {temp: 99.7434, humid:67.6235, date:new Date('Jan 2007 10:00')},
  {temp: 22.7434, humid:88.6235, date:new Date('Jan 2007 11:00')},
  {temp: 44.7434, humid:12.6235, date:new Date('Jan 2007 12:00')},
  {temp: 19.7434, humid:43.6235, date:new Date('Jan 2007 13:00')},
  {temp: 76.7434, humid:23.6235, date:new Date('Jan 2007 14:00')},
  {temp: 44.7434, humid:55.6235, date:new Date('Jan 2007 15:00')},
  {temp: 77.7434, humid:12.6235, date:new Date('Jan 2007 16:00')},
  {temp: 87.7434, humid:77.6235, date:new Date('Jan 2007 17:00')},
  {temp: 15.7434, humid:12.6235, date:new Date('Jan 2007 18:00')}
];

var yLabel = 'Degrees (F) & Humitidy (%)';

var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parse = d3.time.format("%I%p").parse;

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

var line2 = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.humid); });

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
    .attr("stroke", "red")
    .attr("class", "line")
    .attr("d", line(data));

svg.append("path")
    .attr("stroke", "blue")
    .attr("class", "line")
    .attr("d", line2(data));

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