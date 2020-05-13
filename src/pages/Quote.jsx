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
        type="button" 
        id="search-button"
        onClick={() => props.onSubmit(innerSearch)}
        > Search</button>
    </div>
  )
}




export default function Quote() {
  const [rowData, setRowData] = useState([]);
  const [search, setSearch] = useState("A");  //Displays stock with symbol "A" as a preview
  const [errorPage, setErrorPage] = useState("initial");
  
  const columns = [
    { headerName: "Timestamp", field: "timestamp", resizable: true},
    { headerName: "Symbol", field: "symbol", resizable: true },
    //{ headerName: "Name", field: "name"}, 
   // { headerName: "Industry", field: "industry"}, 
    { headerName: "Open", field: "open"}, 
    { headerName: "High", field: "high" },
    { headerName: "Low", field: "low"},
    { headerName: "Close", field: "close"}, 
    { headerName: "Volumes", field: "volumes"}
  ];
    
  useEffect(() => {     // should maybe have this fetch in a separate function. 
    setErrorPage("initial");
    fetch(`http://131.181.190.87:3000/stocks/${search}`)
    .then ( res => res.json())
    .then( data => {
      if (data.error === true) {
        setErrorPage(data.message); 
      } else {
        setRowData([data])
      } 
    })
    // .then(stocks => setRowData([stocks]))
  }, [search]);

  if (errorPage !== "initial") {
    return <p> 
      Error: {errorPage}. Please search for a new stock by symbol in the search bar.
      <SearchBar
        onSubmit={setSearch} />
       </p>
  } 

  return (
    <center>
    <div>
      <h2>Quote</h2>
      <p>A specific stock in detail is displayed. For looking up a specific stock, use the search bar below.</p>

      <SearchBar
        onSubmit={setSearch} />
    <div
    className="ag-theme-balham-dark"
    style={{
      height: "100px", 
      width: "1405px", 
    }}
    >
      <AgGridReact
      columnDefs={columns}
      rowData={rowData}
      />

    </div>
    </div>
    </center>
  );
  
}