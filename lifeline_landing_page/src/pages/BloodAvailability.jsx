import React, { useEffect, useRef, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const { CanvasJSChart } = CanvasJSReact;

const BarChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5206/api/BloodRL/predict");
        if (response.ok) {
          const data = await response.json();
          setChartData(data);
        } else {
          console.error("Failed to fetch data:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBloodGroupChange = (event) => {
    setSelectedBloodGroup(event.target.value);
  };

  return (
    <div className="container">
        <div className="text-center mx-auto mb-5 mt-5" style={{ maxWidth: 500 }}>
              <h5 className="d-inline-block text-uppercase border-bottom border-5">
                See
              </h5>
              <h3 className="display-4">Blood Availability Predictions</h3>
            </div>
      {chartData && (
        <div className="chart-container">
        <label htmlFor="bloodGroupSelect" className="display-4" style={{color:'darkblue' ,fontSize: '20px', marginBottom: '8px', display: 'block', textAlign:'center' }}>
  Select Blood Group:
</label>
<center>
<select
  id="bloodGroupSelect"
  onChange={handleBloodGroupChange}
  style={{alignContent:'center !important' ,padding: '8px', fontSize: '17px' }}
>
  {Object.keys(chartData).map((bloodGroup) => (
    <option
      key={bloodGroup}
      value={bloodGroup}
      style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '4px' }}
    >
      {bloodGroup}
    </option>
  ))}
</select>
</center>
<br />


          {selectedBloodGroup && (
            <div className="hospital-chart">
              <h3 style={{textAlign:"center"}}>{selectedBloodGroup} Blood Group</h3><br />
              <CanvasJSChart
                options={{
                  animationEnabled: true,
                  theme: "dark2",
                  title: {
                    text: "Predicted Blood Availability For The Next Two Days",
                  },
                  axisY: {
                    title: "Predicted Availability",
                    scaleBreaks: {
                      autoCalculate: true,
                      type: "wavy",
                      lineColor: "white",
                    },
                  },
                  data: [
                    {
                      type: "column",
                      indexLabel: "{y}",
                      indexLabelFontColor: "white",
                      dataPoints: Object.values(chartData[selectedBloodGroup]).map((item) => ({
                        label: item.hospitalName,
                        y: item.predictedAvailability,
                      })),
                    },
                  ],
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BarChart;
