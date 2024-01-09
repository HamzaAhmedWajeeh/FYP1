import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

const NotificationD = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPatients = async () => {
      try {
        const pdId = userProfile ? userProfile.dId : null;
        const apiUrl = `http://localhost:5206/api/patient_cr/doctorpatient?pdId=${pdId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Ensure that data is an array before setting it to patients
        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          // If data is not an array, create an array with a single element
          setPatients([data]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatients();
  }, []);

  const formatTime = (timeString) => {
    try {
      // Assuming timeString is in the format "HH:mm:ss.SSSSSSS"
      const [hours, minutes, seconds] = timeString.split(":");
      const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-US');
      return formattedTime;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid Time";
    }
  };

  const formatDate = (dateString) => {
    try {
      const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <div className="content">
      {/* Your existing code for dropdown and rendering notifications */}

      {/* Rendering patients with accepted status */}
      <Row>
        {patients.map((patient, index) => (
          <Col key={index} lg="6" md="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">New Appointment</CardTitle><br/>
                    {/* Render patient details here */}
                    <h3>Patient Name: {patient.pName}</h3>
                    <h4>Patient No.: {patient.pId}</h4>
                    <h4 style={{ color: 'red' }}>Time: {formatTime(patient.pTime)}</h4>
                    <h4 style={{ color: 'red' }}>Date: {formatDate(patient.pDate)}</h4>
                    <h4>Mobile No.: {patient.pMobile}</h4>
                    <h4>Email: {patient.pEmail}</h4>
                    {/* Include other patient details as needed */}
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NotificationD;
