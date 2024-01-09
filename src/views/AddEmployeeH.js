import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
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

export default function AddEmployeeH() {

  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;
  const [formData, setFormData] = useState({
    HeName: "",
    HeRole: "",
    HeEmail: "",
    HePassword: "",
    HeHId: userProfile ? userProfile.hId : null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if any of the required fields are empty
    if (!formData.HeName || !formData.HeRole || !formData.HeEmail) {
      alert('Please fill in all the required fields');
      setLoading(false);
      return;
    }

    // Validate email format
    if (!validateEmail(formData.HeEmail)) {
      alert('Invalid or unusual email');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5206/api/HEmployee_Cr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Employee added successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
        setFormData({
          HeName: "",
          HeRole: "",
          HeEmail: "",
          HeHId: userProfile.HeHId,
        });
      } else {
        if (response.status === 403) {
          alert('An Employee Already exists with this email.');
        } else {
          console.error("Error adding employee");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false when the submission is complete
    }

  };


  const validateEmail = (email) => {
    return validator.isEmail(email);
};

 const handleEmailBlur = () => {
    const emailFieldValue = formData.HeEmail;

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
              <h5 className="title">Add Employee</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        defaultValue=""
                        value={formData.HeName}
                        name="HeName"
                        placeholder="Mike"
                        type="text"
                        required
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Designation</label>
                      <Input
                      value={formData.HeRole}
                        defaultValue=""
                        name="HeRole"
                        placeholder="Employee"
                        type="text"
                        required
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Input
                      value={formData.HeEmail}
                        placeholder="mike@email.com"
                        name="HeEmail"
                        type="email"
                        onChange={handleInputChange}
                        onBlur={handleEmailBlur}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <CardFooter>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
