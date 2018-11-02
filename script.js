let addRow = document.getElementById('add-row');
let clear = document.getElementById('clear');
let start = document.getElementById('start');
let tableElement = document.getElementById('tableElement');
let selectElement = document.getElementsByTagName('select')[0];
let bodyElement = document.getElementsByTagName('body')[0];
let currentColor = 'red';
let columns = 25;
let rows = 50;
let interval = null;
window.onload = function() {
  let x = rows;
  while (x >= 0) {
    makeRow(x);
    x--;
  }
};

function calculateNeighbors(x, y) {
  return [
    [x, y],
    [x, y + 1],
    [x + 1, y + 1],
    [x + 1, y],
    [x + 1, y - 1],
    [x, y - 1],
    [x - 1, y - 1],
    [x, y - 1],
  ].filter(pair => {
    return (
      pair[0] >= 0 && pair[0] <= rows && pair[1] >= 0 && pair[1] <= columns
    );
  });
}

function makeRow(x) {
  const tr = document.createElement('tr');
  let y = columns;

  while (y >= 0) {
    const td = document.createElement('td');
    const neighbors = calculateNeighbors(x, y);
    td.obj = {
      living: false,
      row: x,
      column: y,
      neighbors: neighbors,
    };
    console.dir(td.obj);
    tr.append(td);
    y--;
  }
  tableElement.appendChild(tr);
}

function startGame() {
  interval = setInterval(()=>{
    let tdElements = Array.from(document.getElementsByTagName('td'));
    tdElements.forEach(element => {

      let elementNeighbors = element.obj.neighbors;
      let livingCount = 0;
      elementNeighbors.forEach(element => {

        if (element.living){
          livingCount++;
        }
        searchForDead.apply(tdElements,element);
      });
    });
  },100);
}
function searchForDead(x,y){
  this.filter(element=>{
    element.obj.x =
  });
}
start.addEventListener('click', startGame);
clear.addEventListener('click', () => {
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
