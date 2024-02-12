import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";
import { Doughnut } from 'react-chartjs-2';

const MedicalPortfolioP = () => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
  const [medicationHistory, setMedicationHistory] = useState([]);
  const [gnnResult, setGnnResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medResponse = await fetch(`http://localhost:5206/api/medicine/${userProfile.pId}`);
        if (medResponse.ok) {
          const medData = await medResponse.json();
          const medicationData = medData.prescriptions || [];
          setMedicationHistory(medicationData);
        } else {
          console.error("Failed to fetch medication history:", medResponse.status, medResponse.statusText);
        }

        // Fetch GNN result
        const gnnResponse = await fetch(`http://localhost:5206/api/GNNModel/${userProfile.pId}`);
        if (gnnResponse.ok) {
          const gnnData = await gnnResponse.json();
          setGnnResult(gnnData || { GNNResult: "No data available" });
        } else {
          console.error("Failed to fetch GNN result:", gnnResponse.status, gnnResponse.statusText);
          setGnnResult({ GNNResult: "No data available" });
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [userProfile.pId]);

  const gnnChartData = {
    labels: ['No Serious Health Risk', 'Serious Health Risk'],
    datasets: [
      {
        data: [
          gnnResult && gnnResult.GNNResult === 'No serious health risk detected.' ? 1 : 0,
          gnnResult && gnnResult.GNNResult !== 'No serious health risk detected.' ? 1 : 0,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const userProfileHeaders = [
    { key: 'pName', pname: 'Patient Name' },
    { key: 'pDob', pname: 'Date of Birth' },
    { key: 'pMobile', pname: 'Mobile' },
    { key: 'pEmail', pname: 'Email' },
    // Add more headers as needed
  ];

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Patient Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Table>
            <tbody>
              {userProfileHeaders.map(({ key, pname }) => (
                <tr key={key}>
                  <th>{pname}</th>
                  <td>{userProfile[key]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">Appointment History</CardTitle>
        </CardHeader>

        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Hospital</th>
                <th>Date</th>
                <th>Disease</th>
                <th>Medicine</th>
                <th>Schedule Time</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {gnnResult && gnnResult.Prescriptions.map((prescription, index) => (
                <tr key={index + medicationHistory.length}>
                  <td>{prescription.doctor.dName}</td>
                  <td>{prescription.hospital.hName}</td>
                  <td>{prescription.prescription.dpDate}</td>
                  <td>{prescription.prescription.dpDisease}</td>
                  <td>{prescription.prescription.dpMedicine}</td>
                  <td>{prescription.prescription.dpScheduleTime}</td>
                  <td>{prescription.prescription.dpStartDate}</td>
                  <td>{prescription.prescription.dpEndDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
        <br />
        </Card>
        <Card>
        <CardBody>
          {gnnResult && gnnResult.GNNResult === 'No serious health risk detected.' ? (
            <>
              <h2 style={{ textAlign: 'center' }}>Result on your past medical history <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg></h2><br />
              <h3 style={{ textAlign: 'center' }}>Congratulations!</h3>
            </>
          ) : (
            <>
              <h3 style={{ textAlign: 'center' }}>Oh, Consult a doctor please.</h3>
              <p style={{ textAlign: 'center' }}>{gnnResult && gnnResult.GNNResult}</p>
            </>
          )}
          <div style={{ maxWidth: '300px', margin: 'auto' }}>
            <Doughnut data={gnnChartData} />
          </div>
          </CardBody>
          </Card>

    </div>
  );
};

export default MedicalPortfolioP;
