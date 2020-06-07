import React, { useState, useEffect } from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";


// search bar to search for an industry
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

// query to the API
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


// save data from the response from the API
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
 

// unsuccessful search
 if (errorPage !== "initial") {
   
  return (
     <center>
     <div>
       <h2> Stocks </h2>
       <p> Here are all stocks displayed. If you want to look at a particular industry, use the search bar below.</p>
         <SearchBar
         onSubmit={setSearch} />
      <p>{errorPage}</p>
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
  )
} 

  //successful search
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
