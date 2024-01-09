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

export default function HospitalServices() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentServices, setCurrentServices] = useState([]);
  const [error, setError] = useState(null);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Fetch hospital services based on heHId here
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5206/api/HospitalServices/GetServicesByHospitalId/${userProfile.heHId}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentServices(data);
          setError(null);
        } else if (response.status === 404) {
          setCurrentServices([]);
          setError("No services found for the hospital.");
        } else {
          console.error("Failed to fetch hospital services:", response.status, response.statusText);
          setError("Failed to fetch hospital services.");
        }
      } catch (error) {
        console.error("An error occurred while fetching hospital services:", error);
        setError("An error occurred while fetching hospital services.");
      }
    };

    fetchData();
  }, [userProfile.heHId]);

  const indexOfLastService = currentPage * rowsPerPage;
  const indexOfFirstService = indexOfLastService - rowsPerPage;
  const servicesToDisplay = currentServices.slice(indexOfFirstService, indexOfLastService);

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Hospital Services</CardTitle>
            </CardHeader>
            <CardBody>
              {error ? (
                <p>{error}</p>
              ) : (
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicesToDisplay.map((service, index) => (
                      <tr key={index}>
                        <td>
                          <p>{service.hsServices}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
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
                        length: Math.ceil(currentServices.length / rowsPerPage),
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
