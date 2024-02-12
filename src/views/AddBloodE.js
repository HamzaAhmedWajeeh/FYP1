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
const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;



export default function AddBloodE() {
  const [bloodAvailability, setBloodAvailability] = useState({
    baHId: userProfile.heHId,
    baBloodGroup: "",
    baBottlesAvailable: "",
    baDate: "",
    baTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBloodAvailability({ ...bloodAvailability, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5206/api/BloodAvailability_Cr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bloodAvailability),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert("Blood added successfully!");
      } else {
        console.error("Failed to add blood availability:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while adding blood availability:", error);
    }
  };

  const bloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Blood Form</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Blood Group</label>
                      <select
    className="form-control"
    name="baBloodGroup"
    value={bloodAvailability.baBloodGroup}
    onChange={handleInputChange}
  >
    <option value="">Select Blood Group</option>
    {bloodGroups.map((group) => (
      <option key={group} value={group}>
        {group}
      </option>
    ))}
  </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Bottles Donated</label>
                      <Input
                        name="baBottlesAvailable"
                        type="number"
                        required
                        value={bloodAvailability.baBottlesAvailable}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <label>Select Date</label>
                    <Input
                      name="baDate"
                      type="date"
                      required
                      value={bloodAvailability.baDate}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col className="pl-md-1" md="4">
                    <FormGroup>
                      <label>Select Time</label>
                      <select
                        className="form-control"
                        name="baTime"
                        value={bloodAvailability.baTime}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Time</option>
                        <option value="14:30:00">14:30:00</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Button className="btn-fill" color="success" type="submit">
                  Save
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
