import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const userProfile = JSON.parse(localStorage.getItem("userProfile")) || null;

export default function DoctorH() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`http://localhost:5206/api/Doctors_Cr/ByHospitalId/${userProfile.hId}`);
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
        console.log(data)
      } else {
        console.error("Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="content">
      <Row className="justify-content-end">
        <Col xs="12">
          <Link to="/admin/AdddoctorH">
            <Button className="btn-fill" color="primary" type="submit">
              New Doctor
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {doctors.map((doctor) => (
          <Col lg="4" md="12" key={doctor.dId}>
            <Card className="card-chart">
              <CardHeader>
                <Row>
                <Col className="text-left" sm="12" style={{ textAlign: 'center' }}>
                    <CardTitle tag="h3" style={{textAlign: 'center'}}>
                    <img
                      alt="image"
                      width={120}
                      style={{ marginBottom: 'inherit'}}
                      src={`http://localhost:5206/images_d/${doctor.dImage}`}
                    />
                      <br />
                      {doctor.dName}
                    </CardTitle>
                    <h3 style={{textAlign: 'center', marginBottom: '14px'}}>{doctor.dField}</h3>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
