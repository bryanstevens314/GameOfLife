let addRow = document.getElementById('add-row');
let tableElement = document.getElementById("tableElement");

function makeRow() {
  const tr = document.createElement('tr');
  let columns = 3;
  while (columns >= 0) {
    const td = document.createElement('td');
    tr.append(td);
    columns--;
  }
  tableElement.appendChild(tr);
}

addRow.addEventListener("click", makeRow);
