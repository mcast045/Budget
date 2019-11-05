import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";
import { withRouter } from "react-router-dom";
import { addUser } from "../Redux/actions";

const Home = props => {
  const initialState = {
    name: "",
    monthlyIncome: ""
  };

  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    let user = {
      id: uniqid(),
      name: state.name,
      monthlyIncome: +state.monthlyIncome,
      // savings: null,
      billTitle: [],
      billCost: [],
      goalCost: [],
      goalTitle: []
    };
    dispatch(addUser(user));
    setState(initialState);
    props.history.push("/setmeupbills");
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            className="form-control"
            id="usr"
            name="name"
            value={state.name}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>
            Monthly income: <span className="sideNotes">(take home pay)</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="monthlyIncome"
            value={state.monthlyIncome}
            onChange={onChange}
          />
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            id="btnSub"
            disabled={state.monthlyIncome === "" || state.name === ""} //disable until last form is filled
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Home);