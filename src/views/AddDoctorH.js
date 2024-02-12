import React, { useState } from "react";
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

import * as validator from 'validator';

export default function AddDoctorH() {
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    DName: "",
    DHId: userProfile ? userProfile.hId : null,
    DField: "",
    DEmail: "",
    DPassword: "",
    DMobile: "",
    dAvailablityStatus: "",
    ImageFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      ImageFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if any of the required fields are empty
    if (
      !formData.DName ||
      !formData.DField ||
      !formData.DEmail ||
      !formData.DMobile ||
      !formData.dAvailablityStatus ||
      !formData.ImageFile
    ) {
      alert("Please fill in all the required fields");
      setLoading(false);
      return;
    }

    // Validate email format
    if (!validateEmail(formData.DEmail)) {
      alert("Invalid or unusual email");
      setLoading(false);
      return; // Skip form submission
    }

    const form = new FormData();
    for (const key in formData) {
      if (key === "ImageFile") {
        form.append("ImageFile", formData[key]);
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:5206/api/Doctors_Cr", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setSuccessMessage("Doctor added successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
        setFormData({
          DName: "",
          DHId: userProfile ? userProfile.hId : null,
          DField: "",
          DEmail: "",
          DPassword: "",
          DMobile: "",
          dAvailablityStatus: "",
          ImageFile: null,
        });
        // Redirect to the /admin/Doctor route
        navigate("/admin/DoctorH");
      } else if (response.status === 403) {
        // Show an error alert for 403 response
        alert("Access denied. You do not have permission to perform this action.");
      } else {
        // Handle other error cases
        const responseData = await response.json();
        console.error("Server response:", responseData);

        // Check if the response indicates that a doctor with the email already exists
        if (
          responseData.error &&
          responseData.error.includes("Employee with this Email already exists")
        ) {
          alert("Employee with this Email already exists!");
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Add this line to log the stack trace
      console.error(error.stack);
    } finally {
      setLoading(false); // Set loading to false after form submission (whether successful or not)
    }
  };


const validateEmail = (email) => {
  return validator.isEmail(email);
};

const handleEmailBlur = () => {
  const emailFieldValue = formData.DEmail;

  if (!validateEmail(emailFieldValue)) {
    console.log('Invalid or unusual email');

  }
};

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Doctor</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        value={formData.DName}
                        name="DName"
                        placeholder="Mike"
                        type="text"
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Field</label>
                      <Input
                        value={formData.DField}
                        name="DField"
                        placeholder="Surgeon"
                        type="text"
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Input
                        value={formData.DEmail}
                        placeholder="mike@email.com"
                        name="DEmail"
                        type="email"
                        onChange={handleInputChange}
                        onBlur={handleEmailBlur}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Contact No.</label>
                      <Input
                        value={formData.DMobile}
                        name="DMobile"
                        placeholder="Contact"
                        type="text"
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Availability Status</label>
                      <select
                        className="form-control"
                        name="dAvailablityStatus"
                        id="genderSelect"
                        value={formData.dAvailablityStatus}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Add Photo</label>
                      <Input
                        type="file"
                        name="ImageFile"
                        id="Photo"
                        onChange={handleFileChange}
                        required
                      />

                      <br></br>
                      <div
                        style={{
                          border: "2px solid #00bf9a",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50px",
                          height: "50px",
                        }}
                      >
                        <i className="fa fa-camera" />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <CardFooter>
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
              >
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
