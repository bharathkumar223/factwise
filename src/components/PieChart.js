import { Pie } from "react-chartjs-2";

const PieChart = ({ vaccinated, notVaccinated}) => {
  /* 
    data: An Array of two numbers 
    [no. of people vaccinated, no. of people not vaccinated]
  */
  const options = {
    labels: ["Vaccinated", "Not Vaccinated"],
    datasets: [
      {
        label: "My First Dataset",
        data: [vaccinated,notVaccinated],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4
      }
    ],
    height: "50%"
  };
  return <Pie data={options} />;
};

export default PieChart;
