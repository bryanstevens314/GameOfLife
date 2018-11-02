let addRow = document.getElementById('add-row');
let clear = document.getElementById('clear');
let start = document.getElementById('start');
let tableElement = document.getElementById('tableElement');
let selectElement = document.getElementsByTagName('select')[0];
let bodyElement = document.getElementsByTagName('body')[0];
let currentColor = 'red';
let columns = 25;
let rows = 50;
window.onload = function () {

  while (columns >= 0) {
    columns--;
    makeRow(columns);
  }
};

function calculateNeighbors(element) {
  let num = 8;
  let leftTopCorner = 0;
  let centerTop = 0;
  let rightTopCorner = 0;
  let centerRight = 0;
  let rightBottomCorner = 0;
  let bottomCenter = 0;
  let leftBottomCorner = 0;
  let centerleft = 0;
  element.neighbors.push(
    leftTopCorner,
    centerTop,
    rightTopCorner,
    centerRight,
    rightBottomCorner,
    bottomCenter,
    leftBottomCorner,
    centerleft);

}

function makeRow() {

  const tr = document.createElement('tr');
  tr.obj = {
    row: rows,
    column: columns,
    neighbors: []
  };
  calculateNeighbors(tr);
  console.dir(tr.obj);
  while (rows >= 0) {
    const td = document.createElement('td');
    tr.append(td);
    rows--;
  }
  tableElement.appendChild(tr);
}

function startGame() {

}
start.addEventListener('click', startGame);
clear.addEventListener("click", () => {
  let tableItemsArray = Array.from(document.getElementsByTagName('td'));
  tableItemsArray.forEach(element => {
    element.className = 'lightGray';
  });
});
//Row clicked
addRow.addEventListener('click', makeRow);
//Table cell clicked
tableElement.addEventListener('click', event => {
  if (event.target.matches('td')) {
    event.target.className = currentColor;
  }
});

function mouseOverFunc(event) {
  if (event.target.matches('td')) {
    event.target.className = currentColor;
  }
}
tableElement.addEventListener('mousedown', event => {
  if (event.target.matches('td')) {
    //Moused over change color of cells
    tableElement.addEventListener('mouseover', mouseOverFunc);
  }
});
let interval = null;
addRow.addEventListener('mousedown', () => {
  interval = setInterval(makeRow, 50);
});
addRow.addEventListener('mouseup', () => {
  clearInterval(interval);
});
bodyElement.addEventListener('mouseup', () => {
  tableElement.removeEventListener('mouseover', mouseOverFunc);
});
selectElement.addEventListener('change', event => {
  currentColor = event.target.value;
});
