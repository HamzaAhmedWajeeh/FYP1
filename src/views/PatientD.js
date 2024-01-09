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
import { Link } from "react-router-dom";

const userProfile = JSON.parse(localStorage.getItem("userProfile")) || null;

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

const PatientD = () => {
  const [patients, setPatients] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
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

  const indexOfLastPatient = currentPage * rowsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - rowsPerPage;
  const currentPatients = patients.slice(
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
              <CardTitle tag="h4">Patients</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    {/* <th>Possible Diagnosis</th> */}
                    {/* <th>Status</th> */}
                    <th>Prescription</th>
                    {/* <th>Medicine</th> */}
                  </tr>
                </thead>
                <tbody>
  {/* Rendering table rows based on fetched patient data */}
  {currentPatients.map((patient, index) => (
    <tr key={index}>
      <td>
        <p>{patient.pName}</p>
      </td>
      <td>
        <p>{new Date(patient.pDob).toLocaleDateString()}</p>
      </td>
      <td>
        <p>{patient.pMobile}</p>
      </td>
      <td>
        <p>{patient.pEmail}</p>
      </td>
      <td>
        <p>{new Date(patient.pDate).toLocaleDateString()}</p>
      </td>
      <td>
        <p>{patient.pTime}</p>
      </td>
      {/* <td>
        <p>{patient.pReason}</p>
      </td> */}
      {/* <td style={{ textAlign: "left" }}>
        <input
          type="radio"
          id={`attend-${index}`}
          name={`attend-${index}`}
          value="Attend"
        />
        <label htmlFor={`attend-${index}`} style={{marginLeft:'10px'}}>Yes</label>
        <br />
        <input
          type="radio"
          id={`nattend-${index}`}
          name={`attend-${index}`}
          value="nAttend"
        />
        <label htmlFor={`nattend-${index}`} style={{marginLeft:'10px'}}>No</label>
      </td> */}
      <td>
        <Link to={`/doctor/PrescriptionD/${patient.pId}`}>
          <button className="btn btn-success">Add</button>
        </Link>
      </td>
      {/* <td>
        <Link to={`/doctor/MedicineD/${patient.pId}`}>
          <button className="btn btn-warning">Add</button>
        </Link>
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
                        length: Math.ceil(patients.length / rowsPerPage),
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
};

export default PatientD;
