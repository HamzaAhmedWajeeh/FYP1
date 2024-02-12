import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table } from "reactstrap";

const PrescriptionsD = () => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
  console.log(userProfile)
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(`http://localhost:5206/api/medicine/prescription/${userProfile.dId}`);
        if (response.ok) {
          const data = await response.json();
          setPrescriptions(data || []);
        } else {
          console.error("Failed to fetch prescriptions:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [userProfile.dId]);

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Prescription History</CardTitle>
        </CardHeader>

        <CardBody>
          <Table>
            <thead>
              <tr>
                {/* <th>Patient Name</th> */}
                <th>Patient ID</th>
                <th>Date</th>
                <th>Disease</th>
                <th>Medicine</th>
                <th>Schedule Time</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
    <tr key={index}>
      {/* <td>{prescription.dpP ? prescription.dpP.pName : 'Unknown'}</td> */}
      <td>{prescription.dpPId}</td>
      <td>{prescription.dpDate}</td>
      <td>{prescription.dpDisease}</td>
      <td>{prescription.dpMedicine}</td>
      <td>{prescription.dpScheduleTime}</td>
      <td>{prescription.dpStartDate}</td>
      <td>{prescription.dpEndDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default PrescriptionsD;