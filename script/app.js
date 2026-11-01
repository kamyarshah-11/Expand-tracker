const table = document.getElementById("table");

const nameInp = document.getElementById("nameInp");
const amountInp = document.getElementById("amountInp");
const descriptionInp = document.getElementById("descriptionInp");

const select = document.getElementById("selected");

const themeBtn = document.getElementById("theme");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");

const totalIncome = document.getElementById("totalIncome");
const totalPayed = document.getElementById("totalPayed");
const total = document.getElementById("total");

// =========================
// STATE
// =========================

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let editingId = null;

// =========================
// LOCAL STORAGE
// =========================

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// =========================
// ADD / UPDATE
// =========================

function adding() {
  const name = nameInp.value.trim();
  const amount = Number(amountInp.value);
  const description = descriptionInp.value.trim();
  const type = select.value;

  // Validation
  if (
    !name ||
    !description ||
    !amountInp.value.trim() ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !["income", "payed"].includes(type)
  ) {
    alert("Please enter valid information.");
    return;
  }

  const transaction = {
    id: editingId ?? crypto.randomUUID(),
    name,
    amount,
    description,
    type,
  };

  // Update
  if (editingId !== null) {
    const index = transactions.findIndex((item) => item.id === editingId);

    if (index !== -1) {
      transactions[index] = transaction;
    }
  } else {
    // Add
    transactions.push(transaction);
  }

  editingId = null;

  saveTransactions();

  renderTransactions();

  resetInput();

  calculateTotals();

  updateFormState();
}

// =========================
// RENDER TABLE
// =========================

function renderTransactions() {
  table.innerHTML = "";

  transactions.forEach((transaction, index) => {
    createRow(transaction, index);
  });
}

// =========================
// CREATE ROW
// =========================

function createRow(transaction, index) {
  const row = table.insertRow();

  row.dataset.id = transaction.id;

  // Number
  row.insertCell(0).textContent = index + 1;

  // Name
  row.insertCell(1).textContent = transaction.name;

  // Amount
  row.insertCell(2).textContent =
    transaction.type === "payed"
      ? `-${transaction.amount}`
      : `+${transaction.amount}`;

  // Description
  row.insertCell(3).textContent = transaction.description;

  // Type
  row.classList.add(transaction.type === "payed" ? "payed" : "income");

  // Options
  const options = row.insertCell(4);

  // Edit button
  const edit = document.createElement("button");

  edit.textContent = "Edit";
  edit.type = "button";

  edit.onclick = () => {
    editting(transaction.id);
  };

  // Delete button
  const deleteElement = document.createElement("button");

  deleteElement.textContent = "Delete";
  deleteElement.type = "button";

  deleteElement.onclick = () => {
    deleteBtn(transaction.id);
  };

  options.append(edit, deleteElement);
}

// =========================
// EDIT
// =========================

function editting(id) {
  const transaction = transactions.find((item) => item.id === id);

  if (!transaction) return;

  editingId = id;

  nameInp.value = transaction.name;
  amountInp.value = transaction.amount;
  descriptionInp.value = transaction.description;
  select.value = transaction.type;

  updateFormState();

  nameInp.focus();
}

// =========================
// CANCEL EDIT
// =========================

function cancelEdit() {
  editingId = null;

  resetInput();

  updateFormState();
}

// =========================
// FORM STATE
// =========================

function updateFormState() {
  if (editingId !== null) {
    addBtn.innerHTML = "<span>✓</span> Update Transaction";

    addBtn.classList.add("update-btn");

    cancelBtn.hidden = false;
  } else {
    addBtn.innerHTML = "<span>＋</span> Add Transaction";

    addBtn.classList.remove("update-btn");

    cancelBtn.hidden = true;
  }
}

// =========================
// DELETE
// =========================

function deleteBtn(id) {
  if (editingId === id) {
    cancelEdit();
  }

  transactions = transactions.filter((item) => item.id !== id);

  saveTransactions();

  renderTransactions();

  calculateTotals();
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
// CALCULATE TOTALS
// =========================

function calculateTotals() {
  let income = 0;
  let payed = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else if (transaction.type === "payed") {
      payed += transaction.amount;
    }
  });

  const balance = income - payed;

  totalIncome.textContent = income;
  totalPayed.textContent = payed;
  total.textContent = balance;
}

// =========================
// LOAD TRANSACTIONS
// =========================

function loadTransactions() {
  renderTransactions();

  calculateTotals();
}

// =========================
// THEME
// =========================

function changeTheme() {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");

  themeBtn.textContent = darkMode ? "🌙 Dark Mode" : "☀️ Light Mode";

  localStorage.setItem("theme", darkMode ? "dark" : "light");
}

// =========================
// LOAD THEME
// =========================

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  const darkMode = savedTheme === "dark";

  document.body.classList.toggle("dark", darkMode);

  themeBtn.textContent = darkMode ? "🌙 Dark Mode" : "☀️ Light Mode";
}

// =========================
// INITIALIZE
// =========================

loadTheme();

loadTransactions();

updateFormState();
