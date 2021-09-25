const chartColors = [
  '#ED637D',
  '#F29E4B',
  '#F7CC68',
  '#56C0C1',
  '#9b59b6',
  '#2ecc71',
  '#d35400',
  '#95a5a6',
  '#3498db',
  '#34495e',
  '#f1c40f',
  '#e67e22',
];

export function randomColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export function randomChartColor(index: number) {
  return chartColors[index] ? chartColors[index] : randomColor();
}
