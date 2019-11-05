import React from "react";
import Header from "../Components/header";
import BillTable from "../Components/Table/Table";

const BillTablesPage = () => {
  return (
    <div>
      <Header type="bill_table" />
      <BillTable />
    </div>
  );
};

export default BillTablesPage;
