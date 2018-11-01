let addRow = document.getElementById('add-row');
let tableElement = document.getElementById("tableElement");
let selectElement = document.getElementsByTagName('select')[0];
let currentColor = 'red';

function makeRow() {
  const tr = document.createElement('tr');
  let columns = 20;
  while (columns >= 0) {
    const td = document.createElement('td');
    tr.append(td);
    columns--;
  }
  tableElement.appendChild(tr);
}

function changeColor(cell) {

}

addRow.addEventListener("click", makeRow);
tableElement.addEventListener("click", (event) => {
  if (event.target.matches('td')) {
    event.target.className = currentColor;
  }
});

selectElement.addEventListener("change", (event) => {
  currentColor = event.target.value;
});
