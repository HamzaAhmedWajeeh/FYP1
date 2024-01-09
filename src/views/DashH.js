import React, { useState, useEffect } from "react";
import { Alert, Row, Col } from "reactstrap";

export default function DashH() {
  const [totalPatients, setTotalPatients] = useState(null);
  const [totalAppointments, setTotalAppointments] = useState(null);
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

  useEffect(() => {
    if (!userProfile || !userProfile.hId) {
      console.error("Invalid userProfile or hospitalId");
      return;
    }

    // Fetch data from the Patient API based on the hospital ID
    fetch(`http://localhost:5206/api/patient_cr/patients?hospitalId=${userProfile.hId}`)
      .then((response) => response.json())
      .then((data) => {
        // Calculate the total number of patients based on pId
        const uniquePatientIds = new Set(data.map((patient) => patient.pId));
        const patientCount = uniquePatientIds.size;

        // Update the state with the total patient count
        setTotalPatients(patientCount);
      })
      .catch((error) => console.error("Error fetching patient data:", error));

    // Fetch data from the Appointment API based on the hospital ID
    fetch(`http://localhost:5206/api/appointment_cr/appointments?hospitalId=${userProfile.hId}`)
      .then((response) => response.json())
      .then((data) => {
        // Calculate the total number of appointments based on appointmentId
        const uniqueAppointmentIds = new Set(data.map((appointment) => appointment.appointmentId));
        const appointmentCount = uniqueAppointmentIds.size;

        // Update the state with the total appointment count
        setTotalAppointments(appointmentCount);
      })
      .catch((error) => console.error("Error fetching appointment data:", error));
  }, [userProfile.hId]); // The effect will run whenever the userProfile or its hId changes

  return (
    <div className="content">
      <Row>
        <Col md="6">
          <Alert color="primary" style={{ textAlign: "center" }}>
            <span>
              <h2>Appointment</h2>
              <h4>{totalAppointments !== null ? totalAppointments : "Loading..."}</h4>
            </span>
          </Alert>
          <Alert color="success" style={{ textAlign: "center" }}>
            <span>
              <h2>Total Patient</h2>
              <h4>{totalPatients !== null ? totalPatients : "Loading..."}</h4>
            </span>
          </Alert>
        </Col>
      </Row>
    </div>
  );
}
