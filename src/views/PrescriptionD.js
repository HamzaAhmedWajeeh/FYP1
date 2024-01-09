import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, FormGroup, Form, Input, Row, Col } from "reactstrap";
import {useParams } from "react-router-dom";

const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

export default function PrescriptionD() {
  const { pId } = useParams();
  const [loading, setLoading] = useState(false);

  const [prescriptionData, setPrescriptionData] = useState({
    dpPId: pId,
    dpDisease: "",
    dpDate: "",
    dpStartDate: "",
    dpEndDate: "",
    dpScheduleTime: "",
    dpMedicineName: "",
    dpDId: userProfile ? userProfile.dId : null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData({ ...prescriptionData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !prescriptionData.dpDisease ||
      !prescriptionData.dpDate ||
      !prescriptionData.dpStartDate ||
      !prescriptionData.dpEndDate ||
      !prescriptionData.dpScheduleTime ||
      !prescriptionData.dpMedicineName
    ) {
      alert("Please fill in all required fields.");
      return; // Exit the function if validation fails
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5206/api/medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dpDId: userProfile.dId,
          dpPId: prescriptionData.dpPId,
          dpDate: prescriptionData.dpDate,
          dpDisease: prescriptionData.dpDisease,
          dpMedicine: prescriptionData.dpMedicineName, // Assuming dpMedicineName corresponds to dpMedicine in the API
          dpScheduleTime: prescriptionData.dpScheduleTime,
          dpStartDate: prescriptionData.dpStartDate,
          dpEndDate: prescriptionData.dpEndDate,
        }),
      });

      if (response.ok) {
        alert("Prescription added successfully!");
        setPrescriptionData({
          dpPId: pId,
          dpDisease: "",
          dpDate: "",
          dpStartDate: "",
          dpEndDate: "",
          dpScheduleTime: "",
          dpMedicineName: "",
          dpDId: userProfile ? userProfile.dId : null,
        });
      } else {
        console.error("Failed to add prescription:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while adding prescription:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Prescription</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>ID</label>
                      <Input
                        defaultValue={pId}
                        name="dpPId"
                        placeholder=""
                        type="text"
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Disease</label>
                      <Input
                        value={prescriptionData.dpDisease}
                        name="dpDisease"
                        placeholder=""
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
                      <label>Select Date & Time</label>
                      <Input
                        value={prescriptionData.dpDate}
                        name="dpDate"
                        placeholder="Start Date"
                        type="date"
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="3">
                    <FormGroup>
                      <label>Select Start Date</label>
                      <Input
                        value={prescriptionData.dpStartDate}
                        name="dpStartDate"
                        placeholder="Start Date"
                        type="date"
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="3">
                    <FormGroup>
                      <label>Select End Date</label>
                      <Input
                        value={prescriptionData.dpEndDate}
                        name="dpEndDate"
                        placeholder="End Date"
                        type="date"
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Schedule Time</label>
                      <select
                        className="form-control"
                        name="dpScheduleTime"
                        id="genderSelect"
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Time</option>
                        <option value="09:00:00.0000000">9:00 AM</option>
                        <option value="10:00:00.0000000">10:00 AM</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Medicine</label>
                      <Input
                        value={prescriptionData.dpMedicineName}
                        name="dpMedicineName"
                        placeholder="Medicine Name"
                        type="textarea"
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <CardFooter>
              <Button className="btn-fill" color="primary" type="submit" onClick={handleFormSubmit} disabled={loading}>
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
