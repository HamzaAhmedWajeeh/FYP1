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

export default function ServicesE() {

  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
  const hospitalId = userProfile.heHId || null;

  const [services, setServices] = useState([{ id: 1, value: "" }]);
  const [serviceCount, setServiceCount] = useState(1);

  const addServiceInput = () => {
    const newServiceCount = serviceCount + 1;
    setServiceCount(newServiceCount);
    const newServices = [...services, { id: newServiceCount, value: "" }];
    setServices(newServices);
  };

  const handleServiceChange = (id, event) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, value: event.target.value } : service
    );
    setServices(updatedServices);
  };

  const handleSave = async () => {
    try {
      const hasEmptyService = services.some((service) => !service.value || service.value.trim() === "");

    if (hasEmptyService) {
      console.error("Please fill in all service fields before saving.");
      alert("Add a service first!"); // Do not proceed with the API request
    }
      const response = await fetch("http://localhost:5206/api/HospitalServices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hsHId: hospitalId,
          hsServices: services.map((service) => service.value).join(', '), // Convert array to string
        }),

      });

      if (response.ok) {
        // Handle success, maybe show a success message or redirect
        alert("Service added successfully");
      } else {
        // Handle error, maybe show an error message
        console.error("Failed to add services");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Service</h5>
            </CardHeader>
            <CardBody>
              <Form>
                {services.map((service) => (
                  <Row key={service.id}>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Service</label>
                        <Input
                          value={service.value}
                          name={`H_Service_${service.id}`}
                          placeholder="Service"
                          type="text"
                          required
                          onChange={(event) =>
                            handleServiceChange(service.id, event)
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                ))}
                {/* <Button
                  className="btn-fill"
                  color="info"
                  onClick={addServiceInput}
                >
                  + Add Service
                </Button> */}
            <CardFooter>
              <Button className="btn-fill" color="success" onClick={handleSave}>
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
}
