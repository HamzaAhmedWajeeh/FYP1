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

const Appointment = () => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`http://localhost:5206/api/appointment_cr/pat_app?pName=${userProfile.pName}`);
        if (response.ok) {
          const appointmentData = await response.json();
          setAppointments(appointmentData);
        } else {
          console.error("Failed to fetch appointments:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching appointments:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastAppointment = currentPage * rowsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - rowsPerPage;
  const currentAppointment = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCancelAppointment = async (aId) => {
    try {
      const response = await fetch(`http://localhost:5206/api/appointment_cr/${aId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted appointment from the state
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.aId !== aId)
        );
      } else {
        console.error("Failed to cancel appointment:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while canceling appointment:", error);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Current Appointments</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Reason</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAppointment.map((appointment, index) => (
                    <tr key={index}>
                      {/* <td>
                        <p>{appointment.aPatientName}</p>
                      </td> */}
                      {/* <td>
                        <p>{appointment.aPatientDob}</p>
                      </td> */}
                      <td>
                        <p>{appointment.aDate}</p>
                      </td>
                      <td>
                        <p>{appointment.aTime}</p>
                      </td>
                      {/* <td>
                        <p>{appointment.aMobile}</p>
                      </td>
                      <td>
                        <p>{appointment.aEmail}</p>
                      </td> */}
                      <td>
                        <p>{appointment.aType}</p>
                      </td>
                      <td>
                        <p>{appointment.aReason}</p>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleCancelAppointment(appointment.aId)}
                        >
                          Cancel
                        </button>
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
                        length: Math.ceil(appointments.length / rowsPerPage),
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

export default Appointment;
