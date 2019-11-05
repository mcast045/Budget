import React from "react";

const CalculatedNumbers = props => {
  //Calculate Savings
  const savingCalculator = (spending, income) => {
    let totalMonthlyExpenses = spending.reduce((a, b) => a + b);
    let monthlySavings = income - totalMonthlyExpenses;
    return monthlySavings;
  };


    return (
      props.activeUser.billCost.length !== 0 &&  (
      <div className="containerSummary">
        <div className="incomeSummary">
          <label>Total Monthly Income</label>
          <div>${props.activeUser.monthlyIncome}</div>
        </div>

        <div className="expensesSummary">
          <label>Total Monthly Expenses</label>
          <div>${props.activeUser.billCost.reduce((a, b) => a + b)}</div>
        </div>
        

        <div className="savingSummary">
          <label>Total Monthly Savings</label>
          <div
            style={{ color: savingCalculator(props.activeUser.billCost, props.activeUser.monthlyIncome) > 0 ? "green" : "red" }}
          >
            ${savingCalculator(props.activeUser.billCost, props.activeUser.monthlyIncome)}
          </div>
        </div>
      </div>
    )
  );
};

export default CalculatedNumbers;