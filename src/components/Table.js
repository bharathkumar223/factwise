export default function StyledTable(props) {
  return (
    <table>
      <thead>
        <tr style={{ backgroundColor: "#737373", color: "white" }}>
          <th>Name</th>
          <th>Vaccination Date</th>
          <th>Vaccination Status</th>
        </tr>
      </thead>
      <tbody>
        {
          (!props.data)?<p>no data</p>:((!Array.isArray(props.data))?<p>results are not array : {typeof(props.data)}</p>:
          props.data.map((obj,index)=>{
            var vaccinationStatus = new Date(obj.vaccination_date) <= new Date(props.currentDate)
            return (
              <tr className={vaccinationStatus?"vaccinated":"pending"} key = {index}>
                <td>{obj.person_name}</td>
                <td>{obj.vaccination_date}</td>
                <td>{vaccinationStatus?"Vaccine Done":"Vaccine Pending"}</td>
              </tr>
            )
          }))
        }
      </tbody>
    </table>
  );
}
