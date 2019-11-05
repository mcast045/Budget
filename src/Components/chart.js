import React, { Fragment } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";


const Chart = () => {

  const activeUser = useSelector(state => state.activeUser);

  let chartColors = [
    "rgba(0, 99,132, 0.4)",
    "rgba(255, 132 ,132, 0.5)",
    "rgba(132, 99,132, 0.6)",
    "rgba(174, 4, 100, 0.4)",
    "rgba(53, 23,13, 0.4)",
    "rgba(143, 255,132, 0.3)",
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.4)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(84, 162, 111, 0.7)",
    "rgba(0, 162, 0, 0.5)",
    "rgba(254, 87, 111, 0.5)",
    "rgba(255, 187, 11, 0.9)",
    "rgba(255, 0, 255, 0.6)",
    "rgba(32, 34, 1, 0.5)",
    "rgba(8, 24, 0, 0.5)",
    "rgba(88, 44, 194, 0.4)"
  ];


  //Shuffle array elements
  const shuffleArray = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  //Calculate monthly savings
  const savingCalculator = (spending, income) => {
    if (activeUser.billCost.length !== 0 && activeUser.goalCost.length !== 0) {
      let totalMonthlyExpenses = spending.reduce((a, b) => a + b);
      let monthlySavings = income - totalMonthlyExpenses;
      return monthlySavings;
    }
    else {
      return 0;
    }
  };

  //If user has negative savings, then Doughnut chart will not show negative value
  const savingsVerification = (payments) => {
    if (savingCalculator(activeUser.billCost, activeUser.monthlyIncome) > 0) {
      return [savingCalculator(activeUser.billCost, activeUser.monthlyIncome), payments]
    } else {
      return [payments]
    }
  }


  //If user has no savings, then Doughnut chart will not show savings label
  const savingsLabel = (savings) => {
    if (savings <= 0) {
      return ["Total Monthly Payments"]
    } else {
      return ["Savings", "Total Monthly Payments"]
    }
  }

  //If user has no savings, then Doughnut chart will not show savings label
  const goalLabel = () => {
    if (activeUser.goalCost.length !== 0) {
      if (goalCostRedce() <= 0) {
        return ["Goal Expense Total"]
      } else {
        return ["Savings", "Goal Expense Total"]
      }
    }
  }

  const goalCostRedce = () => {
    if (activeUser.goalCost.length !== 0) {
      return activeUser.goalCost.reduce((a, b) => a + b)
    }
  }

  const billCostRedce = () => {
    if (activeUser.billCost.length !== 0) {
      return activeUser.billCost.reduce((a, b) => a + b)
    }
  }

  let monthlyBreakdownBills = {
    labels: activeUser.billTitle,
    datasets: [
      {
        label: "Payment Titles",
        data: activeUser.billCost,
        backgroundColor: shuffleArray(chartColors)
      }
    ]
  };
  let monthlyBreakdownGoals = {
    labels: activeUser.goalTitle,
    datasets: [
      {
        label: "Goal Titles",
        data: activeUser.goalCost,
        backgroundColor: shuffleArray(chartColors)
      }
    ]
  };

  let savingsData = {
    labels: savingsLabel(savingCalculator(activeUser.billCost, activeUser.monthlyIncome)),
    datasets: [
      {
        label: "Payment Titles",
        data: savingsVerification(billCostRedce()),
        backgroundColor: shuffleArray(chartColors)
      }
    ]
  };

  let goalData = {
    labels: goalLabel(),
    datasets: [
      {
        label: "Goal Titles",
        data: savingsVerification(goalCostRedce()),
        backgroundColor: shuffleArray(chartColors)
      }
    ]
  };

  return (
    <Fragment>
      {(activeUser.billCost.length === 0 || activeUser.goalCost.length === 0) ? (
        <div>
          <h1>Please input either your monthly payments and/or any of your financial goals</h1>
        </div>) : (
          <div className="chart">
            <div className='pieChart'>
              <Pie
                data={monthlyBreakdownBills}
                width={100}
                height={50}
                options={{
                  title: {
                    display: true,
                    text: "Monthly Payments By Bill",
                    fontSize: 25
                  },
                  legend: {
                    display: true,
                    position: "bottom"
                  }
                }}
              />
              <Pie
                data={monthlyBreakdownGoals}
                width={100}
                height={50}
                options={{
                  title: {
                    display: true,
                    text: "Goals Breakdown",
                    fontSize: 25
                  },
                  legend: {
                    display: true,
                    position: "bottom"
                  }
                }}
              />
            </div>
            <div className='doughnutChart'>
              <Doughnut
                data={savingsData}
                width={100}
                height={50}
                options={{
                  title: {
                    display: true,
                    text: "Expenses vs Savings",
                    fontSize: 25
                  },
                  legend: {
                    display: true,
                    position: "bottom"
                  }
                }}
              />
              <Doughnut
                data={goalData}
                width={100}
                height={50}
                options={{
                  title: {
                    display: true,
                    text: "Expected Goal Total vs Savings",
                    fontSize: 25
                  },
                  legend: {
                    display: true,
                    position: "bottom"
                  }
                }}
              />
            </div>
          </div>)}
    </Fragment>
  );
};

export default Chart;