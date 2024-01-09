import React, { useState } from "react";
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
} from "reactstrap";

const samplePatientsData = [
  {
    VC_P_ID: "7229",
    VC_D_ID: "72",
    VC_Date: "18-10-2023",
    VC_Time: "09:30 PM",
  },
  {
    VC_P_ID: "23423",
    VC_D_ID: "25",
    VC_Date: "20-10-2023",
    VC_Time: "08:30 AM",
  },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

export default function VideoE() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPatient = currentPage * rowsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - rowsPerPage;
  const currentPatients = samplePatientsData.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Video Consultation Appointment</CardTitle>
            </CardHeader>
            <CardBody>
            <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Patient ID</th>
                    <th>Doctor ID</th>
                    <th>Date</th>
                    <th>Time</th>                    
                    <th>Accept</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPatients.map((patient, index) => (
                    <tr key={index}>
                      <td>
                        <p>{patient.VC_P_ID}</p>
                      </td>
                      <td>
                        <p>{patient.VC_D_ID}</p>
                      </td>
                      <td>
                        <p>{patient.VC_Date}</p>
                      </td>
                      <td>
                        <p>{patient.VC_Time}</p>
                      </td>                      
                      <td>
                        <button className="btn btn-success">Accept</button>
                      </td>
                      <td>
                        <button className="btn btn-warning">Reject</button>
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
                    onChange={handleRowsPerPageChange}
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
                        length: Math.ceil(
                          samplePatientsData.length / rowsPerPage
                        ),
                      },
                      (_, i) => i + 1
                    ).map((number) => (
                      <PaginationItem
                        key={number}
                        active={number === currentPage}
                      >
                        <PaginationLink
                          onClick={() => paginate(number)}
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
}
