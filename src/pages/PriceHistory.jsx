
import React, { useState, useEffect } from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import {Line} from 'react-chartjs-2';
import {Link} from "react-router-dom";

const API_URL="http://131.181.190.87:3000"


// search bar to search for a specific stock
function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState(""); //input typed in the form is saved in innerSearch
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
        onClick={() => props.onSubmit(innerSearch)}  //the value saved in innerSearch is used as the search term to the API
        > Search</button>
    </div>
  )
}

// date pickers to choose to- and from-dates for a specific stock
function PickDate(props) {

  return (
    <div>
      <label htmlFor="fromdate">From date:</label>
      <input
      name = "fromdate"
      type = "date"
      value = {props.fromDate}
      onChange = {(e) => props.setFromDate(e.target.value)}
      />

      <label htmlFor="todate">To date:</label>
      <input 
      name = "todate"
      type = "date"
      value = {props.toDate}
      onChange = {(e) => props.setToDate(e.target.value)}
      />
    </div>
  )
} 

// query to the API
function getAPI(search, fromDate, toDate) {

  let url;
  if (search === "") {
    url = `${API_URL}/stocks/authed/A?from=${fromDate}&to=${toDate}` // default page when entering and when the search bar is empty 
    
  }
  else {
    url = `${API_URL}/stocks/authed/${search}?from=${fromDate}&to=${toDate}`
  }

  const token = localStorage.getItem("token")
  const headers = {
    accept: "application/json", 
    "Content-Type": "application/json", 
    Authorization: `Bearer ${token}`
  }

  return fetch(url, {
    method: "GET", 
    headers, 
   })
    .then(res => res.json())
    
    
}

// save data from the response from the API
function useStockAPI(search, fromDate, toDate) {
  const [rowData, setRowData] = useState([]);
  const [errorPage, setErrorPage] = useState("initial");
  const [closingPrice, setClosingPrice] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  let valuetest;
  let labeltest;



  useEffect(() => {
    setErrorPage("initial")
    getAPI(search, fromDate, toDate)
    .then( data => {
      if (data.error === true) {
        setErrorPage(data.message);
      }
      else {
        setRowData(data)
        setClosingPrice(data.map(element => element.close))
        setTimestamps(data.map(element => element.timestamp))
      }
    }
      )
  }, [search, fromDate, toDate]);

  return {
    rowData, errorPage, timestamps, closingPrice
  }
}


export default function PriceHistory() {
  const [search, setSearch] = useState("A");
  const [fromDate, setFromDate] = useState("2020-03-15");
  const [toDate, setToDate] = useState("2020-03-31");
  const [chartData, setChartData] = useState({});


  const { rowData, errorPage, timestamps, closingPrice } = useStockAPI(search, fromDate, toDate);

  
  const columns = [
    { headerName: "Timestamp", field: "timestamp", sortable: true},
    { headerName: "Symbol", field: "symbol"},
    { headerName: "Open", field: "open", sortable: true }, 
    { headerName: "High", field: "high", sortable: true },
    { headerName: "Low", field: "low", sortable: true },
    { headerName: "Close", field: "close", sortable: true }, 
    { headerName: "Volumes", field: "volumes", sortable: true }
  ];

  //chart for showing closing prices of the time period
  const chart = () => {
    setChartData({
      labels: timestamps, 
      datasets: [
        {
          label:'Closing price',   
          data: closingPrice,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)'
          ],
          borderWidth: 4
        }
      ] 
    })
  }

  useEffect(() => {
    chart()
  }, [closingPrice, timestamps] )


  // user tries to access page without being logged in
  if(errorPage === "jwt malformed") {
    return (
      <center>
      <p>You cannot access this page without being logged in. Please go to the
        <Link to="/login"> Login</Link> page and log in with your user  account.</p>
      </center>
    )
  }
  

  //unsuccessful search
  if (errorPage !== "initial") {
    return (

    <center>
    <div>
      <h2>Price History</h2>
      <p> Here can you specify a specific stock and look at the history from a specific time period.</p>
      

      <PickDate fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate}/>
      
      <SearchBar
        onSubmit={setSearch} />
        <p>{errorPage}.</p> 

    </div>
    </center>
    )
  } 

  //successful search
  return (
    <center>
    <div>
      <h2>Price History</h2>
      <p> Here can you specify a specific stock and look at the history from a specific time period.</p>

      <PickDate fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate}/>
      
      <SearchBar
        onSubmit={setSearch} />
        <p>Showing results of the stock {search}:</p> 
    <div
    className="ag-theme-balham-dark"
    style={{
      height: "300px", 
      width: "1405px", 
    }}
    >
      <AgGridReact
      columnDefs={columns}
      rowData={rowData}
      pagination={true}
      paginationPageSize={8}
      />

    </div>
    <div>
      <p>Chart of the closing price over the specificed dates for the specificed stock:</p>
      <Line data={chartData} width={100} height={300} options={{ maintainAspectRatio: false }} />
    </div>

    </div>
    </center>
  );
  
}