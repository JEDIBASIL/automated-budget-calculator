const formContent = document.querySelector("#form-details");
const formattedTable = document.querySelector(".formatted-table");
const formattedTableContainer = document.querySelector(".table-container");
const personName = document.querySelector(".persons-name");
const backBtn = document.querySelector(".back");
const summary = document.querySelector(".summary");

const personsDetails = {};

formContent.addEventListener("submit", function (e) {
  e.preventDefault();
  const formFields = [...e.target].slice(0, e.target.length - 1);
  formFields.map((field) => {
    if (field.name !== "gender")
      personsDetails[field.name] = field.value.trim().toLowerCase();
    if (field.getAttribute("type") === "number")
      personsDetails[field.name] = parseInt(field.value.trim());
    if (field.checked) personsDetails["gender"] = field.value.toLowerCase();
  });
  budgetCalculator(personsDetails);
});

class Expenditure {
  type = "";
  percentage = 0;
  amount = 0;
  constructor(type, percentage, amount) {
    this.type = type;
    this.percentage = percentage;
    this.amount = amount;
  }
}

const expensesList = [
  "Feeding",
  "Transportation",
  "House rent",
  "Electricity",
  "Water",
  "Health care",
  "Internet",
  "Cosmetics & Toiletries",
  "Tv subscription",
  "Gym membership",
];

function budgetCalculator(personsDetails) {
  formattedTableContainer.classList.add("show");
  formContent.classList.add("hide");
  const {
    firstName,
    lastName,
    gender,
    age,
    dependents,
    income,
    maritalStatus,
  } = personsDetails;
  gender === "male"
    ? (personName.textContent = `Mr ${
        firstName.charAt(0).toUpperCase() + firstName.slice(1)
      } ${lastName.charAt(0).toUpperCase() + lastName.slice(1)} Budget`)
    : `Mrs ${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
        lastName.charAt(0).toUpperCase() + lastName.slice(1)
      } Budget`;
  let expenditures = [];
  let i = 0;
  while (i < expensesList.length) {
    let cal = 9 / income;
    let expenses = expensesList[i];
    if (expenses.includes("Cosmetics") && gender === "male") cal = 5;
    if (expenses.includes("Cosmetics") && gender === "female") cal = 8;

    if (
      expenses.includes("Feeding") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 10;
    if (
      expenses.includes("Health") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 5;
    if (
      expenses.includes("House") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 10;
    if (
      expenses.includes("Transport") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 10;
    if (
      expenses.includes("Water") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 3;
    if (
      expenses.includes("Internet") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 5;
    if (
      expenses.includes("Tv") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 3;
    if (
      expenses.includes("Electricity") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 5;
    if (
      expenses.includes("Gym") &&
      (dependents <= 0 || maritalStatus === "single")
    )
      cal = 5;

    if (
      expenses.includes("Feeding") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 20;
    if (
      expenses.includes("Health") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 15;
    if (
      expenses.includes("House") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 15;
    if (
      expenses.includes("Transport") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 8;
    if (
      expenses.includes("Water") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 5;
    if (
      expenses.includes("Internet") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 8;
    if (
      expenses.includes("Tv") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 5;
    if (
      expenses.includes("Electricity") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 8;
    if (
      expenses.includes("Gym") &&
      (maritalStatus === "married" || dependents > 0)
    )
      cal = 8;

    expenditures.push(
      new Expenditure(expenses, parseInt(cal), getPercentage(cal, income))
    );

    i++;
  }

  expenditures.map(
    (expenses) =>
      (formattedTable.innerHTML += `
        <tr>
        <td>${expenses.type}</td>
        <td>${expenses.percentage}%</td>
        <td>₦ ${parseInt(expenses.amount)}</td>
    </tr>
    `)
  );
  const totalSpent = parseInt(
    expenditures.reduce((n, { amount }) => n + amount, 0)
  );
  const usedPercentage = parseInt(
    expenditures.reduce((n, { percentage }) => n + percentage, 0)
  );
  summary.innerHTML = `
    <div>
        <p><span>Initial Amount:</span> ₦${income}</p>
        <p><span>Balance:</span> ₦${income - totalSpent}</p>
        <p><span>Percentage spent:</span> ${usedPercentage}%</p>
      </div>
</tr>
</table>`;
}

backBtn.addEventListener("click", function () {
  formattedTableContainer.classList.remove("show");
  formContent.classList.remove("hide");
  formattedTable.innerHTML = `<tr>
    <th>Expenses</th>
    <th>Percentage</th>
    <th>Amount</th>
  </tr>`;
});

function getPercentage(percentage, amount) {
  return (percentage / 100) * amount;
}
