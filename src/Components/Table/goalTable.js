import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteGoal, editGoal, updateGoal } from "../../Redux/actions";

const GoalTable = props => {

  const dispatch = useDispatch();
  const activeUser = useSelector(state => state.activeUser);
  const updateUserGoal = useSelector(state => state.updateGoal);

  const [disableSave, setDisableSave] = useState(false)

  
  const initialGoalState = {
    index: -1,
    goalTitle: '',
    goalCost: ''
  }
  const [state, setState] = useState(initialGoalState);
  useEffect(() => {
    if (updateUserGoal.goalTitle) {
      let goalTitle = updateUserGoal.goalTitle;
      let goalCost = updateUserGoal.goalCost;
      setState({
        goalTitle,
        goalCost
      });
    }
  }, [updateUserGoal]);
  const onGoalChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
    //Prevent user saving a blank billTitle on update form
    let numVerification = (e.target.value)
    if (numVerification === '') {
      setDisableSave(true)
    } else {
      setDisableSave(false)
    }
  };
  const onGoalSubmit = e => {
    e.preventDefault();
    let goal = {
      goalTitle: state.goalTitle,
      goalCost: +state.goalCost,
      index: updateUserGoal.index
    };
    //Require user to input a valid number into goalCost input field
    //And do not dispatch an update if user has only whitespace in goalTitle input field
    if (isNaN(goal.goalCost) || goal.goalTitle.trim().length === 0) {
      return;
    } else {
      dispatch(updateGoal(goal, activeUser.id));
      setState(initialGoalState);
    }
    setHide("none");
    setDisable(false);
  };

  const [hide, setHide] = useState("none"); //Hide update form until edit is clicked
  const [disable, setDisable] = useState(false); //Make edit and delete btn disabled when edit is clicked

  //Reset disable and hide states when update form is canceled
  const onCancel = e => {
    e.preventDefault();
    setHide("none");
    setDisable(false);
  }


  //Ternary operator to control table when goalCost is empty
  return (
    activeUser && (
      <div className="col-md-6">
        <h1>{props.upperCaseName} Goals</h1>
        {activeUser.goalCost.length > 0 ? (
          <div>
            <table className="table table-striped table-dark goalTable">
              <thead>
                <tr className="tableHeader">
                  <th scope="col">Financial Goals</th>
                  <th scope="col">Expected Cost</th>
                </tr>
              </thead>
              <tbody>
                {activeUser.goalTitle.map((title, index) => (
                  <tr key={index}>
                    <td>{title}</td>
                    <td>{activeUser.goalCost[index]}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm btn-edit"
                        disabled={disable}
                        onClick={() => {
                          dispatch(editGoal(title, activeUser.goalCost[index], index))
                          setHide("inline");
                          setDisable(true);
                        }} //Calling 2 function during the onClick
                      >
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: 2 }}
                        className="btn btn-outline-danger btn-sm btn-delete"
                        disabled={disable}
                        onClick={() => {
                          dispatch(deleteGoal(activeUser.id, index));
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className='lastRow'>
                  <th scope="col">Expected Goal Total:</th>
                  <td style={{ color: "green" }}>
                    ${activeUser.goalCost.reduce((a, b) => a + b)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
            <div>
              <table className="table table-striped table-dark goalTable">
                <thead>
                  <tr className="tableHeader">
                    <th scope="col">Financial Goals</th>
                    <th scope="col">Expected Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th scope="col">Expected Goal Total:</th>
                    <td>$0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        <div className="containerGoalForm" style={{ display: hide }}>
          <div className="goalUpdateFields">
            <input
              type="text"
              className="form-control form-goalInfo update-form"
              name="goalTitle"
              placeholder="Edit Goal Title"
              value={state.goalTitle}
              onChange={onGoalChange}
            />
            <input
              type="text"
              className="form-control form-goalInfo update-form"
              name="goalCost"
              placeholder="Edit Goal Cost"
              value={state.goalCost}
              onChange={onGoalChange}
            />
          </div>

          <div className='btnEditForm'>
            <button
              type="submit"
              className="btn btn btn-success btn-md"
              onClick={onGoalSubmit}
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
    )
  );
};

export default GoalTable;
