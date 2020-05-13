
import React, { useState, useEffect } from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import {Chart} from 'chart.js';
import {Line} from 'react-chartjs-2';

const API_URL="http://131.181.190.87:3000"

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

function getAPI(search, fromDate, toDate) {

  let url;
  if (search === "") {
    url = `${API_URL}/stocks/authed/A?from=${fromDate}&to=${toDate}`  //If the search for a stock ends up in an error, one can simply just press search to go back to the initial page. 
    
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

function useStockAPI(search, fromDate, toDate) {
  const [rowData, setRowData] = useState([]);
  const [errorPage, setErrorPage] = useState("initial");
  const [highestPrice, setHighestPrice] = useState();
  const [timestamps, setTimestamps] = useState();


  useEffect(() => {
    setErrorPage("initial")
    getAPI(search, fromDate, toDate)
    .then( data => {
      if (data.error === true) {
        setErrorPage(data.message);
      }
      else {
        setRowData(data)
        setHighestPrice(data.map(element => element.high))
        setTimestamps(data.map(element => element.timestamp))
        console.log(highestPrice)
        console.log(timestamps)
      }
    }
      )
  }, [search, fromDate, toDate]);

  return {
    rowData, errorPage, highestPrice, timestamps
  }
}


export default function PriceHistory() {
  const [search, setSearch] = useState("A");
  const [fromDate, setFromDate] = useState("2020-03-15");
  const [toDate, setToDate] = useState("2020-03-31");
  const [chartData, setChartData] = useState({})

  const { rowData, errorPage, highestPrice, timestamps } = useStockAPI(search, fromDate, toDate);

  
  const columns = [
    { headerName: "Timestamp", field: "timestamp", sortable: true},
    { headerName: "Symbol", field: "symbol"},
    { headerName: "Open", field: "open", sortable: true }, 
    { headerName: "High", field: "high", sortable: true },
    { headerName: "Low", field: "low", sortable: true },
    { headerName: "Close", field: "close", sortable: true }, 
    { headerName: "Volumes", field: "volumes", sortable: true }
  ];

  const chart = () => {
    setChartData({
      labels: timestamps,  // should be an array
      datasets: [
        {
          label:'Highest price',   // should be an array 
          data: highestPrice,
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
  }, [] )
    
  

  if (errorPage !== "initial") {
    // setFromDate("2020-03-15")  //Hvorfor funker ikke dette?
    // setToDate("2020-03-31")
    return <p> 
      Error: {errorPage}.
      <SearchBar
        onSubmit={setSearch} />
       </p>
  } 

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
      />

    </div>
    <div>
      <Line data={chartData}/>
    </div>

    </div>
    </center>
  );
  
}