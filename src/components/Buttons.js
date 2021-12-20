import { useState } from "react";

export default function (props) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [modifiedDate,setModifiedDate] = useState(null)
  const style = {cursor:'pointer'}

  return (
    <>
      <button style={style} onClick={()=>{
                      props.updateCurrentDate(new Date(props.currentDate).getTime()+1000*60*60*24)
                           }}>+</button>
      <p> {new Date(props.currentDate).toString()} </p>
      <button style={style} onClick={()=>{
                      props.updateCurrentDate(new Date(props.currentDate).getTime()-1000*60*60*24)
                           }}>-</button>
    </>
  );
}
