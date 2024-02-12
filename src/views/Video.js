import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

export default function Video() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ADate: "",
    ATime: "",
    ADId: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchDoctors = async (dhId) => {
    try {
      const response = await fetch(`http://localhost:5206/api/Doctors_Cr/ByHospitalId/${dhId}`);
      if (response.ok) {
        const doctorList = await response.json();
        setDoctors(doctorList);
      } else {
        console.error("Failed to fetch doctors:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching doctors:", error);
    }
  };


  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:5206/api/Hospital_Cr");
        if (response.ok) {
          const hospitalList = await response.json();
          setHospitals(hospitalList);
        } else {
          console.error("Failed to fetch hospitals:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      setLoading(true);
      console.log("Form Data:", formData); // Log the form data for debugging

      const response = await fetch("http://localhost:5206/api/appointment_cr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          APatientName: "",
          APatientDOB: "",
          ADate: "",
          ATime: "",
          ADId: "",
          AType: "",
          AMobile: "",
          AEmail: "",
          AReason: "",
        });
        setLoading(false);

        navigate("/patient/Appointment");
        // Add any additional actions you want to perform after successful submission
      } else {
        console.error("Failed to create appointment:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    // If the selected input is the hospital dropdown, clear the doctors list and fetch doctors based on the selected hospital
    if (name === "AHId") {
      setDoctors([]); // Clear the existing doctors list
      fetchDoctors(value);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Create Video Consultation Appointment</h5>
            </CardHeader>
            <CardBody>
            <Form onSubmit={handleSubmit}>
                <Row>
                <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Select Hospital</label>
                      <select
                        className="form-control"
                        name="AHId"
                        onChange={handleInputChange}
                      >
                        <option value="">Select Hospital</option>
                        {hospitals.map((hospital) => (
                          <option key={hospital.hId} value={hospital.hId}>
                            {hospital.hName}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Select Doctor</label>
                      <select
                        className="form-control"
                        name="ADId"
                        onChange={handleInputChange}
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.dId} value={doctor.dId}>
                            {doctor.dName}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Select Appointment Date</label>
                      <Input
                        defaultValue=""
                        name="VC_Date"
                        placeholder="Select Date"
                        type="date"
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Select Appointment Time</label>
                      <select
                        class="form-control"
                        name="VC_Time"
                        id="timeSelect"
                        onChange={handleInputChange}
                      >
                        <option value="">Select Time</option>
                        <option value="14:30:00">14:30:00</option>
                        <option value="14:30:00">14:30:00</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
            <CardFooter>
              <Button className="btn-fill" color="primary" type="submit">
              {loading ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
