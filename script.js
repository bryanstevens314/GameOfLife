let addRow = document.getElementById('add-row');
let clear = document.getElementById('clear');
let tableElement = document.getElementById('tableElement');
let selectElement = document.getElementsByTagName('select')[0];
let bodyElement = document.getElementsByTagName('body')[0];
let currentColor = 'red';

function makeRow() {
  const tr = document.createElement('tr');
  let columns = 50;
  while (columns >= 0) {
    const td = document.createElement('td');
    tr.append(td);
    columns--;
  }
  tableElement.appendChild(tr);
}

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
