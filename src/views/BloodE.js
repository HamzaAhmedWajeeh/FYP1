import React, { useState, useEffect } from "react";
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
const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

export default function BloodE() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [bloodData, setBloodData] = useState([]);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Fetch blood bottles data based on heHId here
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5206/api/BloodAvailability_Cr/api/BloodAvailability/${userProfile.heHId}`);
        if (response.ok) {
          const data = await response.json();
          setBloodData(data);
        } else {
          console.error("Failed to fetch blood bottles data:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching blood bottles data:", error);
      }
    };


    fetchData();
  }, [userProfile.heHId]);

  const indexOfLastPatient = currentPage * rowsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - rowsPerPage;
  const currentPatients = bloodData.slice(indexOfFirstPatient, indexOfLastPatient);

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Blood Availability</CardTitle>
            </CardHeader>
            <CardBody>
            <Table className="tablesorter" responsive>
  <thead className="text-primary">
    <tr>
      {/* <th>Hospital ID</th> */}
      <th>BloodGroup</th>
      <th>Bottles Available</th>
      <th>Date</th>
      {/* <th>Time</th> */}
    </tr>
  </thead>
  <tbody>
    {currentPatients.map((patient, index) => (
      <tr key={index}>
        {/* <td>
          <p>{patient.baHId}</p>
        </td> */}
        <td>
          <p>{patient.baBloodGroup}</p>
        </td>
        <td>
          <p>{patient.baBottlesAvailable}</p>
        </td>
        <td>
          <p>{patient.baDate}</p>
        </td>
        {/* <td>
          <p>{patient.baTime}</p>
        </td> */}
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
                        length: Math.ceil(bloodData.length / rowsPerPage),
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
