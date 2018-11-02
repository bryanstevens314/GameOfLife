let addRow = document.getElementById('add-row');
let clear = document.getElementById('clear');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let tableElement = document.getElementById('tableElement');
let selectElement = document.getElementsByTagName('select')[0];
let bodyElement = document.getElementsByTagName('body')[0];
let currentColor = 'living';
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
    tr.append(td);
    y--;
  }
  tableElement.appendChild(tr);
}

function startGame() {
  interval = setInterval(() => {
    console.log('fired');
    let tdElements = Array.from(document.getElementsByTagName('td'));
    tdElements.forEach(element => {
      let elementNeighbors = element.obj.neighbors.map(elementCoordinates => {
        return searchForElement.apply(tdElements, elementCoordinates);
      });
      let livingCount = 0;
      elementNeighbors.forEach(neighbors => {
        if (neighbors.living) {
          livingCount++;
        }
      });

      if (livingCount < 2) {
        element.living = false;
        element.className = 'lightgray';
      }
      if (livingCount >= 2 && livingCount < 3 && element.living) {
        element.living = true;
        element.className = 'living';
      }
      if (livingCount === 3 && !element.living) {
        element.living = true;
      }
      if (livingCount > 3) {
        element.living = false;
        element.className = 'lightgray';
      }
    });
  }, 1000);
}
function searchForElement(x, y) {
  const search = this.filter(
    element => element.obj.row === x && element.obj.column === y
  );
  return search[0];
}
start.addEventListener('click', startGame);
stop.addEventListener('click', () => {
  clearInterval(interval);
});
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
    event.target.living = true;
  }
});

function mouseOverFunc(event) {
  if (event.target.matches('td')) {
    event.target.className = currentColor;
    event.target.living = true;
  }
}
tableElement.addEventListener('mousedown', event => {
  if (event.target.matches('td')) {
    //Moused over change color of cells
    tableElement.addEventListener('mouseover', mouseOverFunc);
  }
});
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
