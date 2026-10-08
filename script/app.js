const table = document.getElementById("table");

const nameInp = document.getElementById("nameInp");
const amountInp = document.getElementById("amountInp");
const descriptionInp = document.getElementById("descriptionInp");

const select = document.getElementById("selected");

const themeBtn = document.getElementById("theme");

// =========================
// ADD
// =========================

function adding() {
  let value = select.value;

  if (
    !value ||
    !nameInp.value.trim() ||
    !amountInp.value ||
    !descriptionInp.value.trim()
  ) {
    alert("Please fill all the blanks and choose one of the options");
    return;
  }

  const row = table.insertRow();

  // Number
  row.insertCell(0).textContent = table.rows.length - 1;

  // Name
  row.insertCell(1).textContent = nameInp.value;

  // Amount
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

  Delete.textContent = "Delete";

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

// =========================
// DELETE
// =========================

function deleteBtn(element) {
  element.parentElement.parentElement.remove();

  updateRowNumber();

  calculateTotals();
}

// =========================
// UPDATE ROW NUMBERS
// =========================

function updateRowNumber() {
  const rows = table.rows;

  for (let i = 1; i < rows.length; i++) {
    rows[i].cells[0].textContent = i;
  }
}

// =========================
// RESET INPUTS
// =========================

function resetInput() {
  nameInp.value = "";
  amountInp.value = "";
  descriptionInp.value = "";

  select.value = "income";
}

// =========================
// EDIT
// =========================

function editting(element) {
  const row = element.parentElement.parentElement;

  nameInp.value = row.cells[1].textContent;

  amountInp.value = row.cells[2].textContent.slice(1);

  descriptionInp.value = row.cells[3].textContent;

  // Detect transaction type
  if (row.classList.contains("payed")) {
    select.value = "payed";
  } else {
    select.value = "income";
  }

  deleteBtn(element);

  nameInp.focus();
}

// =========================
// CALCULATE TOTALS
// =========================

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

// =========================
// THEME
// =========================

function changeTheme() {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");

  if (darkMode) {
    themeBtn.textContent = "🌙 Dark Mode";

    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "☀️ Light Mode";

    localStorage.setItem("theme", "light");
  }
}

// =========================
// LOAD SAVED THEME
// =========================

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");

    themeBtn.textContent = "🌙 Dark Mode";
  } else {
    document.body.classList.remove("dark");

    themeBtn.textContent = "☀️ Light Mode";
  }
}

// =========================
// INITIALIZE
// =========================

loadTheme();

calculateTotals();
