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

const EmergencyE = () => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;
  const [formData, setFormData] = useState({
    ecHId: userProfile ? userProfile.heHId : "",
    ecNumber1: "",
    ecNumber2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5206/api/EmergencyContact_cr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        setFormData({
          ecHId: userProfile ? userProfile.heHId : "",
          ecNumber1: "",
          ecNumber2: "",
        });
      } else {
        console.error("Error adding emergency contact:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding emergency contact:", error);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Emergency Contact</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Hospital Name</label>
                      <Input
                        value={formData.ecHId}
                        readOnly
                        placeholder=""
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Emergency No. 1</label>
                      <Input
                        value={formData.ecNumber1}
                        onChange={handleChange}
                        name="ecNumber1"
                        placeholder="Contact"
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Emergency No. 2</label>
                      <Input
                        value={formData.ecNumber2}
                        onChange={handleChange}
                        name="ecNumber2"
                        placeholder="Contact"
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
            <CardFooter>
              <Button className="btn-fill" color="success" type="submit">
                Save
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

export default EmergencyE;
