import React from "react";
import { withRouter } from "react-router-dom";

const TableBtn = props => {
  return (
    <div className="containerUpdate">
      <div className="btnBillTable">
        <div className="btnBillDiv">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => props.history.push("/setmeupbills")}
          >
            Add Another Payment
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            onClick={() => props.history.push("/setmeupgoals")}
          >
            Add Financial Goals
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TableBtn);
