import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

// import SetUp from "./Components/Home";
import SetUpPages from "./Pages/SetUpPage";
import Chart from './Pages/ChartsPage';
import Bills from "./Pages/SetmeUpBillsPage";
import Table from './Pages/TablesPage';
import Goals from './Pages/Goalpage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SetUpPages} />
        <Route path="/myCharts" component={Chart} />
        <Route path="/setmeupbills" component={Bills}/>
        <Route path="/table" component={Table}/>
        <Route path="/setmeupgoals" component={Goals} />
      </Switch>
    </div>
  );
}

export default App;
