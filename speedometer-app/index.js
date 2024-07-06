// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactSpeedometer from "react-d3-speedometer";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";

const Speedometer = () => {
  const [value, setValue] = useState(0); // Initial value for the speedometer
  const [customSegments, setCustomSegments] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCustomSegments = async () => {
      try {
        // Check if segments are cached in localStorage
        const cachedSegments = localStorage.getItem("customSegments");
        if (cachedSegments) {
          setCustomSegments(JSON.parse(cachedSegments));
          setLoading(false);
        } else {
          const response = await fetch('http://localhost:5000/customSegments'); // Replace with your API endpoint URL
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCustomSegments(data);
          localStorage.setItem("customSegments", JSON.stringify(data)); // Cache segments in localStorage
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Handle error
      }
    };

    fetchCustomSegments();
  }, []);

  const handleGaugeValueChange = (e) => {
    const newValue = parseInt(e.target.value, 10); // Parse the input value as integer

    if (!isNaN(newValue)) { // Ensure it's a valid number
      setValue(newValue);
    }
  };

  if (loading) {
    return <div className="center">Loading...</div>; // Show loading indicator
  }

  return (
    <div className="center">
      <h1 className="title">Speedometer</h1>

      <Container className="p-3">
        <Row>
          <Col>
            <div className="speedometer">
              <ReactSpeedometer
                maxValue={120}
                value={value}
                ringWidth={20}
                customSegmentStops={customSegments} // Ensure customSegmentStops is set to customSegments
                segmentColors={[
                  "#FAFAFA",
                  "#FAFAFA",
                  "#FAFAFA",
                  "#FAFAFA",
                  "#FAFAFA",
                  "#007fff",
                  "#007fff",
                  "#FAFAFA",
                  "#FAFAFA",
                  "#FAFAFA"
                ]}
                needleTransitionDuration={9000}
                needleTransition="easeElastic"
                currentValueText={`${value} km.hr`}
              />
            </div>
          </Col>
          <Col>
            <form className="form-settings">
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label className="label" htmlFor="value" style={{ color: "white" }}>
                    Change Gauge Value:{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="value"
                    id="value"
                    placeholder="0"
                    onChange={handleGaugeValueChange}
                    value={value}
                  />
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Speedometer;

// Render the Speedometer component into the root element
const rootElement = document.getElementById("root");
ReactDOM.render(<Speedometer />, rootElement);
