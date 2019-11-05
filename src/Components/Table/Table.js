import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableBtn from "./tableBtn";
import GoalsTable from "./goalTable";
import { editBill, deleteBill, updateBill } from "../../Redux/actions";

const SetUpTable = () => { 

  const dispatch = useDispatch();
  const activeUser = useSelector(state => state.activeUser);
  const updateUserBill = useSelector(state => state.updateBill);

  const [hide, setHide] = useState("none"); //Hide update form until edit is clicked
  const [disable, setDisable] = useState(false); //Make edit and delete btn disabled when edit is clicked
  const [disableSave, setDisableSave] = useState(false)

  //Updating bill information
  const initialStateBill = {
    index: -1,
    billTitle: "",
    billCost: ""
  };
  const [state, setState] = useState(initialStateBill);
  useEffect(() => {
    if (updateUserBill.billTitle) {
      let billTitle = updateUserBill.billTitle;
      let billCost = updateUserBill.billCost;
      setState({
        billTitle,
        billCost
      });
    }
  }, [updateUserBill]);
  const onBillChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
    //Prevent user saving a blank billTitle on update form
    let numVerification = (e.target.value)
    if (numVerification === '') {
      setDisableSave(true)
    } else {
      setDisableSave(false)
    }
  };
  const onBillSubmit = e => {
    e.preventDefault();
    let bill = {
      billTitle: state.billTitle,
      billCost: +state.billCost,
      index: updateUserBill.index
    };
    //Require user to input a valid number into billCost input field 
    //And do not dispatch an update if user has only whitespace in billTitle input field
    if (isNaN(bill.billCost) || bill.billTitle.trim().length === 0) {
      return;
    }
    else {
      dispatch(updateBill(bill, activeUser.id));
      setState(initialStateBill);
    }
    setHide("none");
    setDisable(false);
  };

  //Reset disable and hide states when update form is canceled
  const onCancel = e => {
    e.preventDefault();
    setHide("none");
    setDisable(false);
  }

  //Uppercase the user first and last name
  const upperCaseName = str => {
    let lowerCaseStr = str.toLowerCase().trim();
    return lowerCaseStr.split(' ').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ')
  }

  //Calculate monthly savings
  const savingCalculator = (spending, income) => {
    if (activeUser.billCost.length !== 0) {
      let totalMonthlyExpenses = spending.reduce((a, b) => a + b);
      let monthlySavings = income - totalMonthlyExpenses;
      return monthlySavings;
    }
    else {
      return 0;
    }
  };

  return (
    //Run this return only when user has data
    activeUser && (
      <div>
        <div className="tables">
          <div className="col-md-6">
            <h1>{upperCaseName(activeUser.name)} Bills</h1>
            {activeUser.billCost.length !== 0 ? (
              <div>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr className="tableHeader">
                      <th scope="col">Payment Title</th>
                      <th scope="col">Payment Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeUser.billTitle.map((title, index) => (
                      <tr key={index}>
                        <td>{title}</td>
                        <td>{activeUser.billCost[index]}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm btn-edit"
                            disabled={disable}
                            onClick={() => {
                              // props.onEdit(title, user.billCost[index], index);
                              dispatch(editBill(title, activeUser.billCost[index], index))
                              setHide("inline");
                              setDisable(true);
                            }} //Calling 2 function during the onClick
                          >
                            Edit
                      </button>
                          <button
                            style={{ marginLeft: 2 }}
                            disabled={disable}
                            className="btn btn-outline-danger btn-sm btn-delete"
                            onClick={() => {
                              dispatch(deleteBill(activeUser.id, index));
                            }}
                          >
                            X
                      </button>
                        </td>
                      </tr>
                    ))}
                    <tr className='lastRow'>
                      <th scope="col">Total Monthly Payments:</th>
                      <td style={{ color: "red" }}>
                        ${activeUser.billCost.reduce((a, b) => a + b)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
                <div>
                  <table className="table table-striped table-dark">
                    <thead>
                      <tr className="tableHeader">
                        <th scope="col">Payment Title</th>
                        <th scope="col">Payment Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <th scope="col">Total Monthly Payments:</th>
                        <td>
                          $0
                  </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            <div className='updateForms'>
              <div className="containerGoalForm" style={{ display: hide }}>
                <div className="goalUpdateFields">
                  <input
                    type="text"
                    className="form-control form-goalInfo update-form"
                    name="billTitle"
                    placeholder="Edit Goal Title"
                    value={state.billTitle}
                    onChange={onBillChange}
                  />
                  <input
                    type="text"
                    className="form-control form-goalInfo update-form"
                    name="billCost"
                    placeholder="Edit Goal Cost"
                    value={state.billCost}
                    onChange={onBillChange}
                  />
                </div>

                <div className='btnEditForm'>
                  <button
                    type="submit"
                    className="btn btn btn-success btn-md"
                    onClick={onBillSubmit}
                    disabled={disableSave}
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className="btn btn btn-success btn-md btn-cancel"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <GoalsTable upperCaseName={upperCaseName(activeUser.name)} />
        </div>
        <div className='incomeSavingsSummary'>
          <h4>Total Monthly Income: ${activeUser.monthlyIncome}</h4>
          <h4>Total Monthly Savings: ${savingCalculator(activeUser.billCost, activeUser.monthlyIncome)}</h4>
        </div>
        <TableBtn />
      </div>
    )
  );
};

export default SetUpTable;