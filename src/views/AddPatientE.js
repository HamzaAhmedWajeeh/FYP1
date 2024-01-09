import React, { useState, useEffect } from "react";
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

const AddPatientE = () => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;
  const [formData, setFormData] = useState({
    pdId: "",
    pName: "",
    pDob: "",
    pMobile: "",
    pEmail: "",
    pReason: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // Added submitting state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true); // Set submitting to true before making the API call

      const response = await fetch("http://localhost:5206/api/patient_cr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle the response data (you can add additional logic here)

        // Clear the form after successful submission if needed
        setFormData({
          pdId: "",
          pName: "",
          pDob: "",
          pMobile: "",
          pEmail: "",
          pReason: "",
        });
      } else {
        console.error("Error adding patient:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    } finally {
      setSubmitting(false); // Set submitting to false after API call completes
    }
  };

  useEffect(() => {
    if (!userProfile || !userProfile.heHId) {
      console.error("Invalid userProfile or hospitalId");
      return;
    }

    setLoading(true);
    // Fetch doctors based on the logged-in employee's hospital ID
    fetch(`http://localhost:5206/api/Doctors_Cr/ByHospitalId/${userProfile.heHId}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Patient</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-md-1" md="4">
                  <FormGroup>
                      <label>Doctor</label>
                      <Input
                        value={formData.pdId}
                        onChange={handleChange}
                        name="pdId"
                        type="select"
                      >
                        <option value="" disabled>Select Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.dId} value={doctor.dId}>
                            {doctor.dName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        value={formData.pName}
                        onChange={handleChange}
                        name="pName"
                        placeholder="Full Name"
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="4">
                    <FormGroup>
                      <label>Date Of Birth</label>
                      <Input
                        value={formData.pDob}
                        onChange={handleChange}
                        name="pDob"
                        placeholder="DOB"
                        type="date"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Contact No.</label>
                      <Input
                        value={formData.pMobile}
                        onChange={handleChange}
                        name="pMobile"
                        placeholder="Contact"
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Email</label>
                      <Input
                        value={formData.pEmail}
                        onChange={handleChange}
                        name="pEmail"
                        placeholder="example@gmail.com"
                        type="email"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Reason</label>
                      <Input
                        value={formData.pReason}
                        onChange={handleChange}
                        name="pReason"
                        placeholder="Health Issue"
                        type="textarea"
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pl-md-1" md="6">
                    <FormGroup></FormGroup>
                  </Col>
                </Row>
                <CardFooter>
                <Button
                      className="btn-fill"
                      color="success"
                      type="submit"
                      disabled={submitting} // Disable the button while submitting
                    >
                      {submitting ? "Submitting..." : "Save"}
                    </Button>
                </CardFooter>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddPatientE;
