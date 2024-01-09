import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
} from "reactstrap";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

const PrescriptionHistory = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [prescriptions, setPrescriptions] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

  // Function to fetch prescription history
  const fetchPrescriptionHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5206/api/medicine/${userProfile.pId}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setPrescriptions(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } else {
        console.error("Failed to fetch prescriptions:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching prescriptions:", error);
    }
  };

  // Function to send reminders
  const sendReminders = async () => {
    try {
      const response = await fetch('http://localhost:5206/api/MedicineReminder/send-reminders');
      if (response.ok) {
        console.log('Reminders sent successfully.');
      } else {
        console.error('Failed to send reminders:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while sending reminders:', error);
    }
  };

  // Use useEffect to fetch prescription history on page render and set up interval for sending reminders
  useEffect(() => {
    // Initial API call for prescription history
    fetchPrescriptionHistory();

    // Set up interval for continuous API calls to send reminders
    const remindersIntervalId = setInterval(() => {
      sendReminders();
    }, 30000); // 30000 milliseconds = 30 seconds

    // Clear the interval for sending reminders when the component is unmounted
    return () => clearInterval(remindersIntervalId);
  }, [userProfile.pId]); // Dependency on userProfile.pId ensures that the effect runs when userProfile.pId changes

  const indexOfLastPrescription = currentPage * rowsPerPage;
  const indexOfFirstPrescription = indexOfLastPrescription - rowsPerPage;
  const currentPrescriptions = prescriptions.slice(
    indexOfFirstPrescription,
    indexOfLastPrescription
  );

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Prescription History</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Disease</th>
                    <th>Date</th>
                    <th>Medicines</th>
                    <th>Schedule Time</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPrescriptions.map((prescription, index) => (
                    <tr key={index}>
                      <td>
                        <p>{prescription.dpDisease}</p>
                      </td>
                      <td>
                        <p>{prescription.dpDate}</p>
                      </td>
                      <td>
                        <p>{prescription.dpMedicine.split('\n').join(', ')}</p>
                      </td>
                      <td>
                        <p>{prescription.dpScheduleTime}</p>
                      </td>
                      <td>
                        <p>{prescription.dpStartDate}</p>
                      </td>
                      <td>
                        <p>{prescription.dpEndDate}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <Row>
                <Col className="pr-md-1" md="3">
                  <span>Rows Per Page:</span>
                  <select
                    className="form-control"
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                  >
                    {ROWS_PER_PAGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md="6" className="d-flex justify-content-center">
                  <Pagination style={{ marginTop: "40px" }}>
                    {Array.from(
                      {
                        length: Math.ceil(prescriptions.length / rowsPerPage),
                      },
                      (_, i) => i + 1
                    ).map((number) => (
                      <PaginationItem
                        key={number}
                        active={number === currentPage}
                      >
                        <PaginationLink
                          onClick={() => setCurrentPage(number)}
                          href="#"
                        >
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </Pagination>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PrescriptionHistory;
