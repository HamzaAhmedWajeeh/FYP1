import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

const NotificationD = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const pdId = userProfile ? userProfile.dId : null;
        const apiUrl = `http://localhost:5206/api/patient_cr/doctorpatient?pdId=${pdId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (Array.isArray(data)) {
          setPatients(data);
        } else {
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
      <Row>
      {patients.length > 0 ? (
        patients.map((patient, index) => {
          const today = new Date();
          const appointmentDate = new Date(patient.pDate);

          const timeDifference = today.getTime() - appointmentDate.getTime();

          const daysDifference = timeDifference / (1000 * 3600 * 24);

          if (daysDifference <= 1) {
            return (
              <Col key={index} lg="6" md="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="9">
                        <CardTitle tag="h2">New Appointment</CardTitle><br/>
                        <h3>Patient Name: {patient.pName}</h3>
                        <h4>Patient No.: {patient.pId}</h4>
                        <h4 style={{ color: 'red' }}>Time: {formatTime(patient.pTime)}</h4>
                        <h4 style={{ color: 'red' }}>Date: {formatDate(patient.pDate)}</h4>
                        <h4>Mobile No.: {patient.pMobile}</h4>
                        <h4>Email: {patient.pEmail}</h4>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
            );
          } else {
            return alert('No new appointments');
          }
        })
      ) : (
        <h2>No new Appointments</h2>
      )}
    </Row>
  </div>
  );
};

export default NotificationD;
