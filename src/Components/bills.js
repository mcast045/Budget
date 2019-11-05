import React, { useState } from "react";
import { addPayment } from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

const Bills = props => {
  const initialState = {
    billTitle: "",
    billCost: ""
  };


  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  const activeUserId = useSelector(state => state.activeUserId);
  const activeUser = useSelector(state => state.activeUser);


  const anotherBill = () => {
    dispatch(addPayment(activeUserId, state.billTitle, +state.billCost));
    setState({ ...state, billTitle: "", billCost: "" });
  };

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    anotherBill();
    // dispatch(userSavings(activeUserId, activeUser.billCost, activeUser.monthlyIncome));
    setState(initialState);
    //Send user to enter goals if they have no goals filled out
    if (activeUser.goalCost.length === 0){
      props.history.push("/setmeupgoals");
    } else {
      props.history.push("/table");
    }
  };

  return (
    <div className="container">
      <h1 className='infoForm'>Monthly Payment</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Enter bill name:</label>
          <input
            type="text"
            className="form-control form-billInfo"
            name="billTitle"
            value={state.billTitle}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Enter monthly bill cost:</label>
          <input
            type="number"
            className="form-control form-billInfo"
            name="billCost"
            value={state.billCost}
            onChange={onChange}
          />
        </div>
        <div className="btnBillTable">
          <div className="btnBillDiv">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={anotherBill}
              disabled={state.billCost === "" || state.billTitle === ''} //disable until last form is filled
            >
              Another Payment
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={state.billCost === "" || state.billTitle === ''} //disable until last form is filled
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Bills);