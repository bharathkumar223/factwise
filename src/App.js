{/*
  PLEASE BEGIN THIS BY READING THE README.md FILE
*/}
import "./styles.css";
import PieChart from "./components/PieChart";
import StyledTable from "./components/Table";
import Buttons from "./components/Buttons";
import React,{useEffect,useState} from "react";

const reducer = (state, action) => {
  switch(action.type) {
    case "SET_CURRENT_DATE": 
       return {...state, ...action.payload}
    case "SET_VACCINE_DATE": 
       return {...state, ...action.payload}
   case "SET_VACCINED_COUNT": 
       return {...state, ...action.payload}
   case "SET_LOADING": 
       return {...state, ...action.payload}
    default:
       return state
 }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    currentDate: new Date(),
    personInfo: [],
    vaccinatedCount: 0,
    loading: true
  });

  useEffect(() => {
    fetch('./data/current_date.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        dispatch({type: 'SET_CURRENT_DATE', payload: {currentDate : myJson.current_date}})
      });

  },[])

  useEffect(() => {
      fetch('./data/vaccine_dates.json'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      ).then(function(response){
          return response.json();
        }).then(function(myJson) {
          var rows = [];
          for (var key in myJson) {
            if (myJson.hasOwnProperty(key)) {
                rows.push(JSON.parse(JSON.stringify(myJson[key])));
            }
          }
          dispatch({type: 'SET_VACCINE_DATE', payload: {personInfo :rows}})
          const result = myJson.filter(obj => {
            return new Date(obj.vaccination_date) <= new Date(state.currentDate)
          })
          dispatch({type: 'SET_VACCINED_COUNT', payload: {vaccinatedCount : Object.keys(result).length}})
        });
        dispatch({type: 'SET_LOADING', payload: {loading : false}})
  },[state.currentDate])

  function updateCurrentDate(modifiedDate){
    dispatch({type: 'SET_CURRENT_DATE', payload: {currentDate : modifiedDate}})
  }

  const result = state.loading?(
    <p>Loading</p>
  ):(
    <>
      <div className="chart">
        <PieChart vaccinated={state.vaccinatedCount} notVaccinated= {Object.keys(state.personInfo).length}/>
      </div>
      <div className="buttons">
        <Buttons currentDate={state.currentDate} updateCurrentDate={updateCurrentDate}/>
      </div>
      <b style={{ textAlign: "center" }}>
        {state.vaccinatedCount} out of {Object.keys(state.personInfo).length} persons have been vaccinated.
      </b>
      <div className="table">
        <StyledTable data={state.personInfo} currentDate={state.currentDate}/>
      </div>
    </>
  );

  return (
    <div className="App">
      {result}
    </div>
  );
}
