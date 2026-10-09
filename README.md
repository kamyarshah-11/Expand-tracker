
# 💰 Expand Tracker

A simple and responsive web application for managing personal income and expenses.

Expand Tracker helps users record transactions, track their financial activity, and calculate their total income, expenses, and balance through a clean and intuitive interface.

## ✨ Features

- **Add Transactions:** Record income and expenses with a name, amount, description, and type.
- **Edit Transactions:** Update existing transaction details.
- **Delete Transactions:** Remove transactions you no longer need.
- **Financial Summary:** Automatically calculate total income, total expenses, and current balance.
- **Local Data Persistence:** Save transactions in the browser using `localStorage`.
- **Dark & Light Mode:** Switch between themes with your preference saved locally.
- **Responsive Design:** Use the application on desktop, tablet, and mobile screens.
- **Transaction History:** View recorded transactions with numbered rows and visual distinctions between income and expenses.
- **Input Validation:** Prevent submission when required fields are empty.

## 🛠️ Technologies Used

- **HTML5** — Application structure
- **CSS3** — Styling, responsive layouts, and themes
- **JavaScript (Vanilla JS)** — Application logic and DOM manipulation
- **Browser Local Storage** — Client-side data persistence

## 📂 Project Structure

```text
Expand-tracker/
├── index.html
├── script/
│   └── app.js
├── styles/
│   └── style.css
└── README.md
```

## 🚀 Getting Started

### Prerequisites

You only need a modern web browser. No backend, package installation, or build process is required.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kamyarshah-11/Expand-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Expand-tracker
   ```

3. Open `index.html` in your web browser.

You can also open the project folder in VS Code and run it using a local development server.

## 📖 How to Use

1. Open the application in your browser.
2. Enter a transaction name, amount, and description.
3. Select **Income** or **Expense**.
4. Click **Add Transaction** to record it.
5. Review your transaction history and financial summary.
6. Use the **Edit** and **Delete** buttons to manage existing transactions.
7. Switch between light and dark themes using the theme button.

## 💾 Data Storage

The application uses the browser's `localStorage` to store transactions and the selected theme.

- Transactions remain available after refreshing the page in the same browser.
- Data is stored locally and is not synchronized between devices.
- Clearing the browser's site data may remove saved transactions.

## 🧠 What I Learned

This project provides practical experience with:

- DOM manipulation and dynamic HTML elements
- JavaScript arrays and objects
- Event handling and input validation
- CRUD operations (Create, Read, Update, Delete)
- Data persistence with `localStorage`
- Calculating and updating values dynamically
- Responsive web design with CSS Grid and media queries
- Managing application themes with CSS variables and JavaScript

## 🔮 Future Improvements

- Add transaction dates and category filters.
- Add search and sorting functionality.
- Display financial statistics using charts.
- Add data export and import options.
- Improve accessibility and form validation.
- Add optional backend integration for accounts and cloud synchronization.

## 👨‍💻 Author

**Kamyar Shahroudi**

- GitHub: [@kamyarshah-11](https://github.com/kamyarshah-11)
- Project Repository: [Expand Tracker](https://github.com/kamyarshah-11/Expand-tracker)

---

If you find this project useful, consider giving the repository a ⭐.
