import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGoals } from "../Redux/actions";
import { withRouter } from "react-router-dom";

const Goals = props => {
  const initialState = {
    goalTitle: "",
    goalCost: ""
  };
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const activeUser = useSelector(state => state.activeUser);

  const anotherGoal = () => {
    dispatch(addGoals(state.goalTitle, +state.goalCost, activeUser.id));
    setState({ ...state, goalTitle: "", goalCost: "" });
  };

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    anotherGoal();
    setState(initialState);
    if (activeUser.billCost.length === 0){
      props.history.push("/setmeupbills");
    } else {
      props.history.push("/table");
    }
  };

  return (
    <div className="container">
      <h1 className='infoForm'>Financial Goals</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Enter financial goal name:</label>
          <input
            type="text"
            className="form-control form-billInfo"
            name="goalTitle"
            value={state.goalTitle}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Enter expected financial goal cost:</label>
          <input
            type="number"
            className="form-control form-billInfo"
            name="goalCost"
            value={state.goalCost}
            onChange={onChange}
          />
        </div>
        <div className="btnBillTable">
          <div className="btnBillDiv">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={anotherGoal}
              disabled={state.goalCost === "" || state.goalTitle === ""} //disable until last form is filled
            >
              Another Goal
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={state.goalCost === "" || state.goalTitle === ""} //disable until last form is filled
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Goals);