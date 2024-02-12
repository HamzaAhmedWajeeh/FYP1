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

export default function AppointmentE() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;


  const indexOfLastPatient = currentPage * rowsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - rowsPerPage;
  const currentPatients = appointments.slice(
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

  const handleAcceptAppointment = async (aId) => {
    try {
      const response = await fetch(`http://localhost:5206/api/patient_cr/Accept("${aId}")`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aId: aId }),
      });

      if (response.ok) {
        alert('Accepted Succesfully.')
        fetchData();
      } else {
        console.error("Failed to accept appointment:", response.status, response.statusText);
        alert('An error occured while accepting appointment')
      }
    } catch (error) {
      console.error("An error occurred while accepting appointment:", error);
      alert(error)
    }
  };



  const handleRejectAppointment = async (aId) => {
    // Display a confirmation dialog
    const confirmReject = window.confirm("Are you sure you want to reject this appointment?");

    if (confirmReject) {
      try {
        const response = await fetch(`http://localhost:5206/api/appointment_cr/${aId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert('Deleted Succesfully.')
          // Fetch updated list of appointments after rejecting
          fetchData();
        } else {
          console.error("Failed to reject appointment:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while rejecting appointment:", error);
      }
    }
  };


  const fetchData = async () => {
    if (!userProfile || !userProfile.heHId) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5206/api/appointment_cr/appointments?hospitalId=${userProfile.heHId}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setAppointments(data);
        }
      } else {
        console.error("Failed to fetch appointments:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchData(); // This will run only once when the component mounts
  }, []);

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Appointments</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Patient Name</th>
                    <th>DOB</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>D.No.</th>
                    <th>Doctor Name</th>
                    <th>Accept</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPatients.map((appointment, index) => (
                    <tr key={index}>
                      <td>
                        <p>{appointment.aPatientName}</p>
                      </td>
                      <td>
                        <p>{appointment.aPatientDob}</p>
                      </td>
                      <td>
                        <p>{appointment.aDate}</p>
                      </td>
                      <td>
                        <p>{appointment.aTime}</p>
                      </td>
                      <td>
                        <p>{appointment.aReason}</p>
                      </td>
                      <td>
                        <p>{appointment.adId}</p>
                      </td>
                      <td>
                        <p>{appointment.ad?.dName}</p>
                      </td>
                      <td>
                        <button className="btn btn-success" onClick={() => handleAcceptAppointment(appointment.aId)}>
                          Accept
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-warning" onClick={() => handleRejectAppointment(appointment.aId)}>
                          Reject
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
                        length: Math.ceil(
                          appointments.length / rowsPerPage
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
