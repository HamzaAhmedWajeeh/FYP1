import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";

const ROWS_PER_PAGE_OPTIONS = [10, 15];

export default function HospitalS() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [hospitalsData, setHospitalsData] = useState([]);

  const fetchHospitals = async () => {
    try {
      const response = await fetch('http://localhost:5206/api/Hospital_Cr');
      if (response.ok) {
        const data = await response.json();
        setHospitalsData(data);
      } else {
        console.error('Failed to fetch hospitals data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const indexOfLastHospital = currentPage * rowsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - rowsPerPage;
  const currentHospital = hospitalsData.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (index) => {
    setEditMode(true);
    setEditIndex(index);
  };

  const saveEditedHospital = async () => {
    try {
      const editedHospital = currentHospital[editIndex];

      // Make sure 'hId' is defined in the editedHospital object
      if (editedHospital && editedHospital.hId !== undefined) {
        const response = await fetch(`http://localhost:5206/api/Hospital_Cr/${editedHospital.hId}`, {
          method: 'PUT', // Use the appropriate HTTP method for updating
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedHospital),
        });

        if (response.ok) {
          // Successfully updated hospital, refresh data
          fetchHospitals();
        } else {
          console.error('Failed to save edited hospital:', response.status, response.statusText);
        }
      } else {
        console.error('Invalid hospital data for editing:', editedHospital);
      }
    } catch (error) {
      console.error('Error during saveEditedHospital:', error);
    } finally {
      setEditMode(false);
      setEditIndex(null);
    }
  };



  const deleteHospital = async (index) => {
    try {
      const hospitalToDelete = currentHospital[index];

      // Ask the user for confirmation before proceeding with deletion
      const userConfirmed = window.confirm('Are you sure you want to delete this hospital?');

      if (!userConfirmed) {
        return; // User clicked "Cancel" in the confirmation dialog, so don't delete
      }

      const response = await fetch(`http://localhost:5206/api/Hospital_Cr/${hospitalToDelete.hId}`, {
        method: 'DELETE', // Use the appropriate HTTP method for deleting
      });

      if (response.ok) {
        // Successfully deleted hospital, refresh data
        fetchHospitals();
      } else {
        console.error('Failed to delete hospital:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during deleteHospital:', error);
    }
  };


  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Link to="/super/AddHospitalS">
            <Button color="success">Add Hospital</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <br></br>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Hospitals</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHospital.map((hospital, index) => (
                    <tr key={index}>
                      <td>{hospital.hId}</td>
                      <td>
                        {editMode &&
                          editIndex === indexOfFirstHospital + index ? (
                          <input
                            type="text"
                            value={hospital.hName}
                            onChange={(e) => {
                              const updatedHospitals = [...hospitalsData];
                              updatedHospitals[
                                indexOfFirstHospital + index
                              ].hName = e.target.value;
                              setHospitalsData(updatedHospitals);
                            }}
                          />
                        ) : (
                            hospital.hName
                          )}
                      </td>
                      <td>
                        {editMode &&
                          editIndex === indexOfFirstHospital + index ? (
                          <input
                            type="text"
                            value={hospital.hAddress}
                            onChange={(e) => {
                              const updatedHospitals = [...hospitalsData];
                              updatedHospitals[
                                indexOfFirstHospital + index
                              ].hAddress = e.target.value;
                              setHospitalsData(updatedHospitals);
                            }}
                          />
                        ) : (
                            hospital.hAddress
                          )}
                      </td>
                      <td>
                        {editMode &&
                          editIndex === indexOfFirstHospital + index ? (
                          <input
                            type="text"
                            value={hospital.hEmail}
                            onChange={(e) => {
                              const updatedHospitals = [...hospitalsData];
                              updatedHospitals[
                                indexOfFirstHospital + index
                              ].hEmail = e.target.value;
                              setHospitalsData(updatedHospitals);
                            }}
                          />
                        ) : (
                            hospital.hEmail
                          )}
                      </td>
                      <td>{hospital.hlLatitude}</td>
                      <td>{hospital.hlLongitude}</td>
                      <td>
                        {editMode &&
                          editIndex === indexOfFirstHospital + index ? (
                          <button
                            className="btn btn-success"
                            onClick={saveEditedHospital}
                          >
                            Save
                          </button>
                        ) : (
                            <button
                              className="btn btn-warning"
                              onClick={() =>
                                handleEdit(indexOfFirstHospital + index)
                              }
                            >
                              Edit
                            </button>
                          )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteHospital(index)}
                        >
                          Delete
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
                        length: Math.ceil(hospitalsData.length / rowsPerPage),
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
