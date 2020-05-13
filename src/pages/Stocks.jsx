import React, { useState, useEffect } from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";


function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
        <input
        aria-labelledby="search-button"
        name = "search"
        id = "search"
        type ="search" 
        value = {innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)} />
        <button 
        color="danger"
        type="button" 
        id="search-button"
        onClick={() => props.onSubmit(innerSearch)}
        > Search</button>
    </div>
  )
}


function getAPI(search) {

  let url
  if (search === "") {
    url = `http://131.181.190.87:3000/stocks/symbols`
  } else {
    url = `http://131.181.190.87:3000/stocks/symbols?industry=${search}`
  }

  return fetch(url)
    .then( res => res.json())
    
}

function useStockAPI(search) {
  const [rowData, setRowData] = useState([]);
  const [errorPage, setErrorPage] = useState("initial");

  useEffect(() => {
    setErrorPage("initial")
    getAPI(search)
    .then( data => {
      if (data.error === true) {
        setErrorPage(data.message);
      }
      else {
        data.map(stock => {
          return {
            name: stock.name, 
            symbol: stock.symbol,
            industry: stock.industry
          };
        })
        setRowData(data)
      }
    }
      )
  }, [search]);

  return {
    rowData, errorPage
  }
}


export default function Stocks() {
  const [search, setSearch] = useState("");
  const { rowData } = useStockAPI(search);
  const { errorPage } = useStockAPI(search);

  const columns = [
    { headerName: "Name", field: "name", sortable: true, filter: true}, 
    { headerName: "Symbol", field: "symbol", sortable: true}, 
    { headerName: "Industry", field: "industry", sortable: true, filter: true}
  ];
 
 if (errorPage !== "initial") {
   
  return <p> 
    Error: {errorPage}. 
    Please press search to go back to the table, or search for a new industry in the search bar.
    <SearchBar
      onSubmit={setSearch} />
     </p>
} 

  return (
    <center>
    <div>
      <h2> Stocks </h2>
      <p> Here are all stocks displayed. If you want to look at a particular industry, use the search bar below.</p>
        <SearchBar
        onSubmit={setSearch} />
    <div
    className="ag-theme-balham-dark"
    style={{
      height: "700px", 
      width: "600px",
    }}
    >
      <AgGridReact
      columnDefs={columns}
      rowData={rowData} 
      pagination={true}
      paginationPageSize={20} />
    </div>

    </div>
    </center>
  );
}
