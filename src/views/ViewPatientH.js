import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function ViewPatientH() {
  const [patients, setPatients] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

  useEffect(() => {
    const fetchPatients = async () => {
      if (!userProfile || !userProfile.hId) {
        console.error("Invalid userProfile or hospitalId");
        return;
      }

      try {
        // Fetch patients associated with the identified hospital
        const response = await fetch(`http://localhost:5206/api/patient_cr/patients?hospitalId=${userProfile.hId}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    // Fetch patients when the component mounts
    fetchPatients();
  }, []); // The empty dependency array ensures the effect runs only once

  console.log(patients);

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" xs="12">
                  <CardTitle tag="h2">Patients</CardTitle>
                </Col>
              </Row>
              {patients.map((patient) => (
                <Row key={patient.PId}>
                  <Col xs="12">
                    <Card className="card-chart">
                      <CardHeader>
                        <Row>
                          <Col className="text-left" sm="2">
                            {/* Replace patient image with Font Awesome icon */}
                            <FontAwesomeIcon icon={faUser} size="3x" style={{ fontSize: '11em' }} />
                            <br />
                          </Col>
                          <Col className="text-left" sm="4">
                            <h2 style={{ marginBottom: '11px' }}>{patient.pName}</h2>
                            <h4>Age: {calculateAge(patient.pDob)}</h4>
                            <h4>Patient ID: #{patient.pId}</h4>
                            <i className="tim-icons icon-calendar-60" /> Join Date {patient.pDate}
                          </Col>
                          {/* Display the doctor who treated the patient */}

                          <Col className="text-left" sm="4">
                            <h4>Doctor ID: {patient.pdId || "Not specified"}</h4>
                            <h4>Doctor Name: {patient.pd?.dName || "Not specified"}</h4>
                          </Col>

                        </Row>
                      </CardHeader>
                    </Card>
                  </Col>
                </Row>
              ))}
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
