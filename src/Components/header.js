import React from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const Header = props => {
  const activeUser = useSelector(state => state.activeUser);

  //Only return full navbar if there is data currently in the state 
  const fullNavBar =
    (<ul className="nav navbar-nav">
      <li role="presentation">
        <Link to="/setmeupbills">Payments</Link>
      </li>
      <li role="presentation">
        <Link to="/table">Table</Link>
      </li>
      <li role="presentation">
        <Link to="/setmeupgoals">Goals</Link>
      </li>
      <li role="presentation">
        <Link to="/myCharts">Charts</Link>
      </li>
    </ul>)


  const renderLinks = () => {
    const { type } = props;
    if (type === "set_me_up") {
      return (
        <ul className="nav navbar-nav">
          <li role="presentation">
            <Link to="/">Set Up</Link>
          </li>
        </ul>
      );
    } else if (type === "bills") {
      if (activeUser.billCost.length === 0) {
        return (
          <ul className="nav navbar-nav">
            <li role="presentation">
              <Link to="/setmeupbills">
                Payments
              </Link>
            </li>
          </ul>
        );
      }
      else {
        return (fullNavBar);
      }

    } else if (type === "goals") {
      if (activeUser.goalCost.length === 0) {
        return (
          <ul className="nav navbar-nav">
            <li role="presentation">
              <Link to="/setmeupgoals">Goals</Link>
            </li>
          </ul>
        );
      }
      else{
        return(fullNavBar);
      }
    } else if (type === "charts") {
      return (
        <ul className="nav navbar-nav">
          <li role="presentation">
            <Link to="/setmeupbills">Payments</Link>
          </li>
          <li role="presentation">
            <Link to="/table">Table</Link>
          </li>
          <li role="presentation">
            <Link to="/setmeupgoals">Goals</Link>
          </li>
          <li role="presentation">
            <Link to="/myCharts">Charts</Link>
          </li>
        </ul>
      );
    } else if (type === "bill_table") {
      return (
        <ul className="nav navbar-nav">
          <li role="presentation">
            <Link to="/setmeupbills">Payments</Link>
          </li>
          <li role="presentation">
            <Link to="/table">Table</Link>
          </li>
          <li role="presentation">
            <Link to="/setmeupgoals">Goals</Link>
          </li>
          <li role="presentation">
            <Link to="/myCharts">Charts</Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <span className="navbar-brand">Buget</span>
        </div>
        {renderLinks()}
      </div>
    </nav>
  );
};

export default withRouter(Header);