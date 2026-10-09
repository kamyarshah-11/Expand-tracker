const table = document.getElementById("table");

const nameInp = document.getElementById("nameInp");
const amountInp = document.getElementById("amountInp");
const descriptionInp = document.getElementById("descriptionInp");

const select = document.getElementById("selected");

const themeBtn = document.getElementById("theme");

// =========================
// LOCAL STORAGE
// =========================

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// =========================
// SAVE DATA
// =========================

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

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

  const transaction = {
    name: nameInp.value.trim(),

    amount: Number(amountInp.value),

    description: descriptionInp.value.trim(),

    type: select.value,
  };

  // Add to array
  transactions.push(transaction);

  // Save to localStorage
  saveTransactions();

  // Add row to table
  createRow(transaction);

  resetInput();

  calculateTotals();
}

// =========================
// CREATE TABLE ROW
// =========================

function createRow(transaction) {
  const row = table.insertRow();

  // Number
  row.insertCell(0).textContent = table.rows.length;

  // Name
  row.insertCell(1).textContent = transaction.name;

  // Amount
  row.insertCell(2).textContent =
    transaction.type === "payed"
      ? `-${transaction.amount}`
      : `+${transaction.amount}`;

  // Description
  row.insertCell(3).textContent = transaction.description;

  // Row type
  row.classList.add(transaction.type === "payed" ? "payed" : "income");

  // Edit button
  const edit = document.createElement("button");

  edit.textContent = "Edit";

  edit.onclick = function () {
    editting(this);
  };

  // Delete button
  const Delete = document.createElement("button");

  Delete.textContent = "Delete";

  Delete.onclick = function () {
    deleteBtn(this);
  };

  // Options
  const options = document.createElement("td");

  options.appendChild(edit);
  options.appendChild(Delete);

  row.appendChild(options);
}

// =========================
// DELETE
// =========================

function deleteBtn(element) {
  const row = element.parentElement.parentElement;

  const rowIndex = row.rowIndex - 1;

  // Remove from array
  transactions.splice(rowIndex, 1);

  // Save updated array
  saveTransactions();

  // Remove from table
  row.remove();

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

  const rowIndex = row.rowIndex - 1;

  const transaction = transactions[rowIndex];

  nameInp.value = transaction.name;

  amountInp.value = transaction.amount;

  descriptionInp.value = transaction.description;

  select.value = transaction.type;

  // Remove old transaction
  transactions.splice(rowIndex, 1);

  // Save changes
  saveTransactions();

  // Remove old row
  row.remove();

  updateRowNumber();

  calculateTotals();

  nameInp.focus();
}

// =========================
// CALCULATE TOTALS
// =========================

function calculateTotals() {
  let totalIncome = 0;

  let totalPayed = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalPayed += transaction.amount;
    }
  });

  const total = totalIncome - totalPayed;

  document.getElementById("totalIncome").textContent = totalIncome;

  document.getElementById("totalPayed").textContent = totalPayed;

  document.getElementById("total").textContent = total;
}

// =========================
// LOAD TRANSACTIONS
// =========================

function loadTransactions() {
  transactions.forEach((transaction) => {
    createRow(transaction);
  });
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
// LOAD THEME
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

loadTransactions();

calculateTotals();
