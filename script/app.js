function adding() {
  let value = select.value;

  if (!value || !nameInp.value || !amountInp.value || !descriptionInp.value) {
    alert("please fill all the blancks and choose one of the options");
    return;
  }

  const row = table.insertRow();

  row.insertCell(0).textContent = table.rows.length - 1;
  row.insertCell(1).textContent = nameInp.value;
  row.insertCell(2).textContent =
    select.value === "payed" ? `-${amountInp.value}` : `+${amountInp.value}`;
  row.insertCell(3).textContent = descriptionInp.value;
  if (select.value === "payed") {
    row.classList.add("payed");
  } else {
    row.classList.add("income");
  }

  const edit = document.createElement("button");
  edit.textContent = "Edit";

  edit.onclick = function () {
    editting(this);
  };

  const Delete = document.createElement("button");
  Delete.textContent = "delete";

  Delete.onclick = function () {
    deleteBtn(this);
  };

  const options = document.createElement("td");

  options.appendChild(edit);
  options.appendChild(Delete);

  row.appendChild(options);
  resetInput();
  calculateTotals();
}

function deleteBtn(element) {
  element.parentElement.parentElement.remove();
  updateRowNumber();
  calculateTotals();
}

function updateRowNumber() {
  const rows = document.getElementById("table").rows;

  for (let i = 1; i < rows.length; i++) {
    rows[i].cells[0].textContent = i;
  }
  calculateTotals();
}

function resetInput() {
  nameInp.value = "";
  amountInp.value = "";
  descriptionInp.value = "";
}

function editting(element) {
  const row = element.parentElement.parentElement;

  nameInp.value = row.cells[1].textContent;
  amountInp.value = row.cells[2].textContent.slice(1);
  descriptionInp.value = row.cells[3].textContent;

  deleteBtn(element);
  calculateTotals();
}

function calculateTotals() {
  let totalIncome = 0;
  let totalPayed = 0;

  document.querySelectorAll("#table tr.income").forEach((row) => {
    const amount = parseFloat(row.cells[2].textContent);
    totalIncome += amount;
  });

  document.querySelectorAll("#table tr.payed").forEach((row) => {
    const amount = parseFloat(row.cells[2].textContent);
    totalPayed += Math.abs(amount);
  });

  const total = totalIncome - totalPayed;

  document.getElementById("totalIncome").textContent = totalIncome;
  document.getElementById("totalPayed").textContent = totalPayed;
  document.getElementById("total").textContent = total;
}

const table = document.getElementById("table");
const nameInp = document.getElementById("nameInp");
const amountInp = document.getElementById("amountInp");
const descriptionInp = document.getElementById("descriptionInp");
const select = document.getElementById("selected");

calculateTotals();
