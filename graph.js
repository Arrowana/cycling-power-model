const resolution = 100;
const speedDomain = [0, 40];
const powerDomain = [0, 600];

function generateData(powerGivenSpeed) {
  return [...Array(resolution).keys()].map(i => {
    let speed = 40 * i / resolution;
    return {
      speed: speed,
      power: powerGivenSpeed(speed)
    };
  });
}

function plot(powerGivenSpeed) {
  let data = generateData(powerGivenSpeed);

  let width = 500;
  let height = 500
  let margin = ({top: 20, right: 30, bottom: 30, left: 100});

  // Define the axes
  var x = d3.scaleLinear().domain(speedDomain).range([margin.left, width - margin.right]);
  var y = d3.scaleLinear().domain(powerDomain).range([height - margin.bottom, margin.top]);

  let svg = d3.select('#graph');
  svg.selectAll("*").remove(); //Clear previous svg

  svg.attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  let xAxis = d3.axisBottom(x).ticks(10);
  let yAxis = d3.axisLeft(y).ticks(10);

  svg.append("g").call(xAxis)
    .attr("transform", `translate(0, ${height - margin.bottom})`);
  svg.append("g").call(yAxis)
    .attr("transform", `translate(${margin.left}, 0)`);

  var line = d3.line()
    .x(d => x(d.speed))
    .y(d => y(d.power));

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // Add label for axis
  svg.append("text")
    .attr("transform", `translate(${width/2}, ${height + margin.top})`)
    .text("Speed (km/h)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height / 2))
    .attr("y", margin.left / 2)
    .text("Power (W)");
}
